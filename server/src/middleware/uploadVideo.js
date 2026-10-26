import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';

// Video uploads are kept separate from middleware/upload.js (images only, 5MB) so the
// existing image uploads are untouched.
const ALLOWED_VIDEO_MIME_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

export const uploadVideo = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_VIDEO_MIME_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Unsupported video type: ${file.mimetype}. Allowed: MP4, MOV, WEBM, MKV`), false);
  },
  limits: { fileSize: MAX_VIDEO_SIZE_BYTES },
});

/** Streams a multer in-memory video buffer to Cloudinary (chunked, so large files work). */
export const uploadVideoBufferToCloudinary = (buffer, folder = 'lustre/about-reels') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_chunked_stream(
      { folder, resource_type: 'video', chunk_size: 6 * 1024 * 1024 },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

export const deleteVideoFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  } catch (err) {
    console.error(`Failed to delete Cloudinary video ${publicId}:`, err.message);
  }
};