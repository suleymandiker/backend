const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    category: String,
    views: Number,
    comments: Number,
});

module.exports = mongoose.model('Post',postSchema);