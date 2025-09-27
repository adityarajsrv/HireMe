const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    role: {
        type: String,
        enum: ['Job Seeker', 'Recruiter'],
        default: 'Job Seeker'
    },
    country: { type: String, default: "India" },
    city: { type: String, default: "" },
    profileImage: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
