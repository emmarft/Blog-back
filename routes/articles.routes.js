const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const { 
    getArticles, 
    showArticle, 
    postArticles, 
    putArticles, 
    deleteArticles, 
    getPopularArticles, 
    getRecentArticles, 
    getFeaturedArticles, 
    getSearchArticles 
} = require('../controllers/ArticleController');


/// 1️⃣ Route pour récupérer tous les articles
router.get('/articles', getArticles);

// 2️⃣ Route pour récupérer un article par ID
router.get('/article/:id', showArticle);

// 3️⃣ Route pour créer un nouvel article
router.post('/articles', isAdmin, postArticles);

// 4️⃣ Route pour mettre à jour un article
router.put('/articles/:id', putArticles);

// 5️⃣ Route pour supprimer un article
router.delete('/articles/:id', deleteArticles);

// 6️⃣ Récupérer les articles les plus populaires
router.get('/articles/populaires', getPopularArticles);

// 7️⃣ Récupérer les articles les plus récents
router.get('/articles/recents', getRecentArticles);

// 8️⃣ Récupérer l’article à la une
router.get('/articles/une', getFeaturedArticles);

// 9️⃣ Recherche avancée avec mots-clés et filtres
router.get('/articles/recherche', getSearchArticles);

module.exports = router;