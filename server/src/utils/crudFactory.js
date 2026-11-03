import asyncHandler from 'express-async-handler';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../middleware/upload.js';

// Parses the optional `removeImages` body field (a JSON string from multipart forms, or a
// real array from JSON bodies) into a clean array of field names the admin asked to clear.
const parseRemoveList = (raw) => {
  if (Array.isArray(raw)) return raw.filter((n) => typeof n === 'string');
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : [];
    } catch {
      return [];
    }
  }
  return [];
};

/**
 * Generic CRUD handlers for simple list-type collections (services, testimonials, etc).
 * Handles optional single-image field upload via multer (req.file) -> Cloudinary.
 *
 * options:
 *  - imageField: name of the schema field storing { url, publicId } (default 'image')
 *  - sortBy: default sort, e.g. { order: 1 }
 *  - searchable: array of field names allowed for simple ?search= text match (optional)
 *  - arrayImageFields: field names storing an array of { url, publicId } (e.g. a gallery).
 *    The client uploads each new file individually via POST /upload, then sends the full
 *    desired array (kept existing items + newly-uploaded ones) as a JSON string in that
 *    form field. Any items present in the old array but missing from the new one are
 *    deleted from Cloudinary.
 */
export const makeCrudController = (Model, options = {}) => {
  const {
    imageField = 'image',
    // New: pass imageFields: ['image', 'heroImage', ...] for resources with more than
    // one uploadable image. Falls back to [imageField] so existing single-image
    // resources (services, testimonials, etc.) keep working unchanged.
    imageFields = [imageField],
    arrayImageFields = [],
    sortBy = { order: 1, createdAt: 1 },
    searchable = [],
  } = options;

  // Parses a body field that may arrive as a JSON string (multipart form field) or
  // already as an array, returning only well-formed { url, publicId } entries.
  const parseArrayImageField = (raw) => {
    if (Array.isArray(raw)) return raw.filter((it) => it && it.url);
    if (typeof raw === 'string' && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter((it) => it && it.url) : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  // req.file (upload.single) covers the legacy single-image case; req.files (upload.fields)
  // covers the multi-image case. This helper normalizes both into a { fieldName: file } map.
  const collectFiles = (req) => {
    if (req.file) return { [imageField]: req.file };
    if (req.files) {
      const map = {};
      imageFields.forEach((name) => {
        if (req.files[name]?.[0]) map[name] = req.files[name][0];
      });
      return map;
    }
    return {};
  };

  const list = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.search && searchable.length) {
      filter.$or = searchable.map((f) => ({ [f]: { $regex: req.query.search, $options: 'i' } }));
    }
    // allow arbitrary equality filters passed as ?field=value for simple fields like category/page
    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== 'search' && key !== 'page_num' && key !== 'limit') {
        filter[key] = value;
      }
    });

    let query = Model.find(filter).sort(sortBy);
    if (req.query.limit) query = query.limit(Number(req.query.limit));
    const items = await query;
    res.json({ success: true, count: items.length, data: items });
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    res.json({ success: true, data: item });
  });

  const getBySlug = asyncHandler(async (req, res) => {
    const item = await Model.findOne({ slug: req.params.slug });
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const body = { ...req.body };
    const files = collectFiles(req);
    for (const [fieldName, file] of Object.entries(files)) {
      const uploaded = await uploadBufferToCloudinary(file.buffer, Model.collection.collectionName);
      body[fieldName] = { url: uploaded.url, publicId: uploaded.publicId };
    }
    arrayImageFields.forEach((fieldName) => {
      if (body[fieldName] !== undefined) body[fieldName] = parseArrayImageField(body[fieldName]);
    });
    const item = await Model.create(body);
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    const body = { ...req.body };
    const files = collectFiles(req);
    for (const [fieldName, file] of Object.entries(files)) {
      const uploaded = await uploadBufferToCloudinary(file.buffer, Model.collection.collectionName);
      body[fieldName] = { url: uploaded.url, publicId: uploaded.publicId };
      // clean up the old image so we don't leak Cloudinary storage
      if (item[fieldName]?.publicId) {
        await deleteFromCloudinary(item[fieldName].publicId);
      }
    }
    // Admin clicked "Remove image" on one or more single-image fields (and didn't upload a
    // replacement): delete the file from Cloudinary and clear the stored url/publicId.
    for (const fieldName of parseRemoveList(body.removeImages)) {
      if (!imageFields.includes(fieldName) || files[fieldName]) continue;
      if (item[fieldName]?.publicId) {
        await deleteFromCloudinary(item[fieldName].publicId);
      }
      body[fieldName] = { url: '', publicId: '' };
    }
    delete body.removeImages;
    for (const fieldName of arrayImageFields) {
      if (body[fieldName] === undefined) continue;
      const newArr = parseArrayImageField(body[fieldName]);
      const oldArr = item[fieldName] || [];
      const newIds = new Set(newArr.map((it) => it.publicId).filter(Boolean));
      const removed = oldArr.filter((it) => it.publicId && !newIds.has(it.publicId));
      for (const it of removed) {
        await deleteFromCloudinary(it.publicId);
      }
      body[fieldName] = newArr;
    }
    Object.assign(item, body);
    await item.save();
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    for (const fieldName of imageFields) {
      if (item[fieldName]?.publicId) {
        await deleteFromCloudinary(item[fieldName].publicId);
      }
    }
    for (const fieldName of arrayImageFields) {
      for (const img of item[fieldName] || []) {
        if (img?.publicId) await deleteFromCloudinary(img.publicId);
      }
    }
    await item.deleteOne();
    res.json({ success: true, data: {} });
  });

  // Bulk reorder: body = [{ id, order }, ...]
  const reorder = asyncHandler(async (req, res) => {
    const updates = req.body;
    if (!Array.isArray(updates)) {
      res.status(400);
      throw new Error('Expected an array of { id, order }');
    }
    await Promise.all(
      updates.map(({ id, order }) => Model.findByIdAndUpdate(id, { order }))
    );
    res.json({ success: true, message: 'Order updated' });
  });

  return { list, getOne, getBySlug, create, update, remove, reorder };
};

/**
 * Generic controller for singleton documents (SiteSettings, AboutSection, WhoWeAre,
 * BookingSection, ContactInfo) — there is only ever one row, created lazily on first GET.
 */
export const makeSingletonController = (Model) => {
  const get = asyncHandler(async (req, res) => {
    let item = await Model.findOne();
    if (!item) item = await Model.create({});
    res.json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    let item = await Model.findOne();
    if (!item) item = new Model();
    const { removeImages, ...rest } = req.body;
    Object.assign(item, rest);
    // Admin clicked "Remove image": clear the stored image and delete it from Cloudinary.
    // Only genuine image fields (those with a nested url/publicId) can be cleared this way.
    for (const fieldName of parseRemoveList(removeImages)) {
      if (!item.schema.path(`${fieldName}.publicId`)) continue;
      if (rest[fieldName]?.url) continue; // a new image was uploaded for this field — keep it
      const oldPublicId = item[fieldName]?.publicId;
      if (oldPublicId) await deleteFromCloudinary(oldPublicId);
      item[fieldName] = { url: '', publicId: '' };
    }
    await item.save();
    res.json({ success: true, data: item });
  });

  return { get, update };
};