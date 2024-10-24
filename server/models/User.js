// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
