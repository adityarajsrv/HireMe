const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile-images',
    format: async (req, file) => 'webp', 
    public_id: (req, file) => {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return `user-${decoded.id}-${Date.now()}`;
    },
    transformation: [
      { width: 500, height: 500, crop: "fill", gravity: "face", quality: "auto" }
    ]
  },
});

module.exports = { cloudinary, storage };