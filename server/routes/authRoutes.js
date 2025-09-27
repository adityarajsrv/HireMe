const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const router = express.Router();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}).single('profileImage'); // Ensure field name matches frontend

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "Job Seeker",
      phone: "",
      country: "",
      city: "",
      profileImage: null,
      createdAt: new Date().toISOString(),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        country: user.country,
        city: user.city,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      }
    });
  } catch (err) {
    console.error('Registration error:', { message: err.message, stack: err.stack });
    res.status(500).json({ msg: "Server error during registration" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        country: user.country,
        city: user.city,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      }
    });
  } catch (err) {
    console.error('Login error:', { message: err.message, stack: err.stack });
    res.status(500).json({ msg: "Server error during login" });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      country: user.country || "",
      city: user.city || "",
      profileImage: user.profileImage || null,
      createdAt: user.createdAt || new Date().toISOString(),
    });
  } catch (err) {
    console.error('Profile GET error:', { message: err.message, stack: err.stack });
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only update fields that are provided
    const updateFields = {};
    ['firstName', 'lastName', 'email', 'phone', 'role', 'country', 'city'].forEach(field => {
      if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      country: user.country || "",
      city: user.city || "",
      profileImage: user.profileImage || null,
      createdAt: user.createdAt || new Date().toISOString(),
    });
  } catch (err) {
    console.error('Profile update error:', { message: err.message, stack: err.stack });
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token" });
    }
    res.status(500).json({ msg: err.message });
  }
});

router.put('/profile/image', (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', { message: err.message, code: err.code });
        return res.status(400).json({ msg: err.message });
      } else if (err) {
        console.error('Upload error:', { message: err.message, stack: err.stack });
        return res.status(400).json({ msg: err.message });
      }

      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!req.file) {
        return res.status(400).json({ msg: "No image file provided" });
      }

      console.log('Cloudinary response:', {
        path: req.file.path,
        filename: req.file.filename,
      });

      const user = await User.findByIdAndUpdate(
        decoded.id,
        { profileImage: req.file.path },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        country: user.country || "",
        city: user.city || "",
        profileImage: user.profileImage || null,
        createdAt: user.createdAt || new Date().toISOString(),
      });
    } catch (err) {
      console.error('Image upload error:', { message: err.message, stack: err.stack });
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ msg: "Invalid token" });
      }
      res.status(500).json({ msg: err.message });
    }
  });
});

router.delete('/profile/image', async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { profileImage: null },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      msg: "Profile image removed successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        country: user.country || "",
        city: user.city || "",
        profileImage: user.profileImage || null,
        createdAt: user.createdAt || new Date().toISOString(),
      }
    });
  } catch (err) {
    console.error('Image delete error:', { message: err.message, stack: err.stack });
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token" });
    }
    res.status(500).json({ msg: err.message });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
      res.status(200).json({ msg: "Token is valid" });
    });
  } catch (err) {
    console.error('Token verify error:', { message: err.message, stack: err.stack });
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;