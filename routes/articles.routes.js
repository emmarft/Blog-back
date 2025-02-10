const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const { Article, Category } = require('../database');


/// 1️⃣ Route pour récupérer tous les articles
// Importation des modèles


router.get('/articles', async (req, res) => {
    try {
      const articles = await Article.findAll({
        include: [
          {
            model: Category,
            attributes: ['id', 'name'], // Inclure id et name
          },
        ],
      });
  
      res.json(articles);
    } catch (error) {
      // ...
    }
  });


// 2️⃣ Route pour récupérer un article par ID
router.get('/article/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const article = await Article.findByPk(articleId);
        if (article) {
            res.json(article);
        } else {
            res.status(404).send('Article non trouvé');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération de l'article");
    }
});


// 3️⃣ Route pour créer un nouvel article


router.post('/articles', isAdmin, async (req, res) => {
    try {
        const { title, content, image_url, category_id, user_id } = req.body;

        if (!title || !content) {
            return res.status(400).send("Le titre et le contenu sont obligatoires");
        }
        // Vérifier si un article avec le même titre existe déjà
        const existingArticle = await Article.findOne({ where: { title } });
        if (existingArticle) {
            return res.status(400).json({ message: "Cet article existe déjà." });
        }

        // Créer l'article uniquement s'il n'existe pas
        const newArticle = await Article.create({ title, content, image_url, category_id, user_id });
        res.status(201).json(newArticle);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'article");
    }
});



// 4️⃣ Route pour mettre à jour un article
router.put('/articles/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const article = await Article.findByPk(articleId);
        if (!article) {
            return res.status(404).send("Article non trouvé");
        }

        const { title, content, image_url, category_id, user_id } = req.body;
        await article.update({ title, content, image_url, category_id, user_id });

        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de l'article");
    }
});

// 5️⃣ Route pour supprimer un article
router.delete('/articles/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const article = await Article.findByPk(articleId);
        if (!article) {
            return res.status(404).send("Article non trouvé");
        }

        await article.destroy();
        res.send("Article supprimé avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression de l'article");
    }
});

// 6️⃣ Récupérer les articles les plus populaires
router.get('/articles/populaires', async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['views', 'DESC']], limit: 10 });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles populaires');
    }
});

// 7️⃣ Récupérer les articles les plus récents
router.get('/articles/recents', async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles récents');
    }
});

// 8️⃣ Récupérer l’article à la une
router.get('/articles/une', async (req, res) => {
    try {
        const article = await Article.findOne({ where: { featured: true } });
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération de l’article à la une');
    }
});

// 9️⃣ Recherche avancée avec mots-clés et filtres
router.get('/articles/recherche', async (req, res) => {
    try {
        const { q, categorie, date } = req.query;
        const whereClause = {};

        if (q) whereClause.title = { $like: `%${q}%` };
        if (categorie) whereClause.category_id = categorie;
        if (date) whereClause.createdAt = { $gte: new Date(date) };

        const articles = await Article.findAll({ where: whereClause });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la recherche des articles');
    }
});

module.exports = router;