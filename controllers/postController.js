const Post = require('../models/posts.js');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };

    try {
        const newPost = await Post.create(post);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
