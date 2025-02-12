const express = require('express');
const router = express.Router();
const { getCategories, showCategories, postCategories, putCategories, deleteCategories } = require('../controllers/CategoriesController');

// 1️⃣ Route pour récupérer toutes les catégories
router.get('/categories', getCategories);

// 2️⃣ Route pour récupérer une catégorie par ID
router.get('/categories/:id', showCategories);

// 3️⃣ Route pour créer une nouvelle catégorie
router.post('/categories', postCategories);

// 4️⃣ Route pour mettre à jour une catégorie
router.put('/categories/:id', putCategories);

// 5️⃣ Route pour supprimer une catégorie
router.delete('/categories/:id', deleteCategories);

module.exports = router;