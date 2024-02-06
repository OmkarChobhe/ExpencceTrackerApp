const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required and should be unique'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
}, {timestamps: true}); // Use 'timestamps' instead of 'timespams'

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
