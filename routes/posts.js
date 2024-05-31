const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET istekleri için zaten var olan kod
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
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
    comments: req.body.comments,
    image: req.body.image // Resim URL'sini dahil et
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (Güncelleme) işlemi için endpoint
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Gelen verilerle postu güncelleme
    post.title = req.body.title;
    post.description = req.body.description;
    post.date = req.body.date;
    post.category = req.body.category;
    post.views = req.body.views;
    post.comments = req.body.comments;
    post.image = req.body.image; // Resim URL'sini dahil et

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
