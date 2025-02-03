const express = require('express');
const app = express();
// DB
const { initDB, Article, Category, Comment, User } = require('./database');
initDB();

/// 1️⃣ Route pour récupérer tous les articles
app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles');
    }
});

// 2️⃣ Route pour récupérer un article par ID
app.get('/article/:id', async (req, res) => {
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
app.post('/articles', async (req, res) => {
    try {
        const { title, content, image_url, category_id, user_id } = req.body;
        if (!title || !content) {
            return res.status(400).send("Le titre et le contenu sont obligatoires");
        }

        const newArticle = await Article.create({ title, content, image_url, category_id, user_id });
        res.status(201).json(newArticle);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'article");
    }
});

// 4️⃣ Route pour mettre à jour un article
app.put('/articles/:id', async (req, res) => {
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
app.delete('/articles/:id', async (req, res) => {
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
app.get('/articles/populaires', async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['views', 'DESC']], limit: 10 });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles populaires');
    }
});

// 7️⃣ Récupérer les articles les plus récents
app.get('/articles/recents', async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles récents');
    }
});

// 8️⃣ Récupérer l’article à la une
app.get('/articles/une', async (req, res) => {
    try {
        const article = await Article.findOne({ where: { featured: true } });
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération de l’article à la une');
    }
});

// 9️⃣ Recherche avancée avec mots-clés et filtres
app.get('/articles/recherche', async (req, res) => {
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


/** ========================= CRUD pour les Catégories ========================= **/

// 1️⃣ Route pour récupérer toutes les catégories
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des catégories');
    }
});

// 2️⃣ Route pour récupérer une catégorie par ID
app.get('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Catégorie non trouvée');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération de la catégorie");
    }
});

// 3️⃣ Route pour créer une nouvelle catégorie
app.post('/categories', async (req, res) => {
    try {
        const re = req.body;
        if (!name) {
            return res.status(400).send("Le nom de la catégorie est obligatoire");
        }

        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la catégorie");
    }
});

// 4️⃣ Route pour mettre à jour une catégorie
app.put('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).send("Catégorie non trouvée");
        }

        const { name } = req.body;
        await category.update({ name });

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de la catégorie");
    }
});

// 5️⃣ Route pour supprimer une catégorie
app.delete('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).send("Catégorie non trouvée");
        }

        await category.destroy();
        res.send("Catégorie supprimée avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la suppression de la catégorie");
    }
});


/** ========================= Interactions Utilisateur ========================= **/

// 1️⃣ Ajouter un commentaire sous un article
app.post('/articles/:id/commentaires', async (req, res) => {
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
app.get('/articles/:id/commentaires', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { article_id: req.params.id } });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des commentaires');
    }
});

// 3️⃣ Mettre à jour un commentaire 
app.put('/commentaires/:id', async (req, res) => {
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
app.delete('/commentaires/:id', async (req, res) => {
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
app.post('/articles/:id/like', async (req, res) => {
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


/** ========================= Formulaire de Contact & Soumission Bons Plans ========================= **/

// 1️⃣ Formulaire de contact
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) return res.status(400).send('Tous les champs sont requis');
        
        console.log(`Nouveau message de contact: ${name} - ${email}: ${message}`);
        res.status(200).send('Message envoyé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l’envoi du message');
    }
});

// 2️⃣ Soumission de bons plans
app.post('/bons-plans', async (req, res) => {
    try {
        const { user_id, title, description } = req.body;
        if (!title || !description) return res.status(400).send('Le titre et la description sont requis');
        
        console.log(`Nouveau bon plan soumis: ${title} - ${description}`);
        res.status(201).send('Bon plan soumis');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la soumission du bon plan');
    }
});


/** ========================= Espace Administrateur ========================= **/

// 1️⃣ Récupérer les statistiques
app.get('/admin/statistiques', async (req, res) => {
    try {
        const stats = {
            totalArticles: await Article.count(),
            totalCommentaires: await Comment.count(),
            totalUtilisateurs: await User.count(),
        };
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des statistiques');
    }
});

// 2️⃣ Gestion des utilisateurs (liste)
app.get('/admin/utilisateurs', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

// 3️⃣ Suppression d’un utilisateur
app.delete('/admin/utilisateurs/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send('Utilisateur non trouvé');
        await user.destroy();
        res.send('Utilisateur supprimé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression de l’utilisateur');
    }
});


// Configuration du serveur
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});