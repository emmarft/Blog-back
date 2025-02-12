const express = require('express');
const router = express.Router();
const { Comment } = require('../database');

// 1️⃣ Ajouter un commentaire sous un article
router.post('/articles/:id/commentaires', async (req, res) => {
    try {
        const { user_id, content } = req.body;
        const articleId = req.params.id;

        if (!content) return res.status(400).send('Le commentaire ne peut pas être vide');

        const newComment = await Comment.create({ article_id: articleId, user_id, content });
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l’ajout du commentaire');
    }
});

// 2️⃣ Récupérer tous les commentaires d’un article
router.get('/articles/:id/commentaires', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { article_id: req.params.id } });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des commentaires');
    }
});

// 3️⃣ Mettre à jour un commentaire 
router.put('/commentaires/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).send('Commentaire non trouvé');

        const { content } = req.body;
        await comment.update({ content });
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la mise à jour du commentaire');
    }
});


// 4️⃣ Supprimer un commentaire (avec modération)
router.delete('/commentaires/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).send('Commentaire non trouvé');
        await comment.destroy();
        res.send('Commentaire supprimé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression du commentaire');
    }
});

// 5️⃣ Ajouter un like à un article
router.post('/articles/:id/like', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).send('Article non trouvé');

        article.likes += 1;
        await article.save();
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l’ajout du like');
    }
});

module.exports = router;