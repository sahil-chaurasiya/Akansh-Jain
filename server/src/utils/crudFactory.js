import asyncHandler from 'express-async-handler';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../middleware/upload.js';

/**
 * Generic CRUD handlers for simple list-type collections (services, testimonials, etc).
 * Handles optional single-image field upload via multer (req.file) -> Cloudinary.
 *
 * options:
 *  - imageField: name of the schema field storing { url, publicId } (default 'image')
 *  - sortBy: default sort, e.g. { order: 1 }
 *  - searchable: array of field names allowed for simple ?search= text match (optional)
 */
export const makeCrudController = (Model, options = {}) => {
  const {
    imageField = 'image',
    // New: pass imageFields: ['image', 'heroImage', ...] for resources with more than
    // one uploadable image. Falls back to [imageField] so existing single-image
    // resources (services, testimonials, etc.) keep working unchanged.
    imageFields = [imageField],
    sortBy = { order: 1, createdAt: 1 },
    searchable = [],
  } = options;

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
    Object.assign(item, req.body);
    await item.save();
    res.json({ success: true, data: item });
  });

  return { get, update };
};