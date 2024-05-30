const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// GET istekleri için zaten var olan kod
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Yeni POST isteği ekleme
router.post('/', async (req, res) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category,
      views: req.body.views,
      comments: req.body.comments
    });
  
    try {
      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



module.exports = router;