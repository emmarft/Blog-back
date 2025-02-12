const express = require('express');
const router = express.Router();
const { postComment, getComment, putComment, deleteComment, postLikeComment } = require('../controllers/CommentController');

// 1️⃣ Ajouter un commentaire sous un article
router.post('/articles/:id/commentaires', postComment);

// 2️⃣ Récupérer tous les commentaires d’un article
router.get('/articles/:id/commentaires', getComment);

// 3️⃣ Mettre à jour un commentaire 
router.put('/commentaires/:id', putComment);

// 4️⃣ Supprimer un commentaire (avec modération)
router.delete('/commentaires/:id', deleteComment);

// 5️⃣ Ajouter un like à un article
router.post('/articles/:id/like', postLikeComment);

module.exports = router;