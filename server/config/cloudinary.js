const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token provided for Cloudinary upload");
      }
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return {
        folder: 'profile-images',
        format: 'webp',
        public_id: `user-${decoded.id}-${Date.now()}`,
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "face", quality: "auto" }
        ],
      };
    } catch (err) {
      console.error('Cloudinary storage error:', { message: err.message, stack: err.stack });
      throw err;
    }
  },
});

module.exports = { cloudinary, storage };