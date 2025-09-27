const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    role: { type: String, default: "Job Seeker" },
    country: { type: String, default: "India" },
    city: { type: String, default: "" },
    state: { type: String, default: "" }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);