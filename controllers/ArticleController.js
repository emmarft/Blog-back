const { Article, Category } = require('../database');

const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name'],
                },
            ],
        });

        res.json(articles);
    } catch (error) {
        console.log(error);
    }
};

const showArticle = async (req, res) => {
    const articleId = req.params.id;
    if (isNaN(articleId)) {
        return res.status(400).send('ID d\'article invalide');
    }

    try {
        const article = await Article.findByPk(articleId);

        if (article) {
            res.json(article);
        } else {
            res.status(404).send('Article non trouvé');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur interne du serveur');
    }
};

const postArticles = async (req, res) => {
    try {
        const { title, content, image_url, category_id, user_id } = req.body;

        if (!title || !content) {
            console.log("Données manquantes :", { title, content });
            return res.status(400).send("Le titre et le contenu sont obligatoires");
        }
        
        // Vérifier si un article avec le même titre existe déjà
        const existingArticle = await Article.findOne({ where: { title } });
        if (existingArticle) {
            console.log("Article existant trouvé :", existingArticle);
            return res.status(400).json({ message: "Cet article existe déjà." });
        }

        // Créer l'article uniquement s'il n'existe pas
        const newArticle = await Article.create({ title, content, image_url, category_id, user_id });
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Erreur lors de la création de l'article :", error);
        res.status(500).send("Erreur lors de la création de l'article");
    }
};

const putArticles = async (req, res) => {
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
};

const deleteArticles =  async (req, res) => {
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
};

const getPopularArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['views', 'DESC']], limit: 10 });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles populaires');
    }
};

const getRecentArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['createdAt', 'DESC']], limit: 10 });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des articles récents');
    }
};

const getFeaturedArticles = async (req, res) => {
    try {
        const article = await Article.findOne({ where: { featured: true } });
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération de l’article à la une');
    }
};

const getSearchArticles = async (req, res) => {
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
};

module.exports = { 
    getArticles, 
    showArticle, 
    postArticles, 
    putArticles, 
    deleteArticles, 
    getPopularArticles, 
    getRecentArticles, 
    getFeaturedArticles,
    getSearchArticles
};