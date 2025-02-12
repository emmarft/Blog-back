const { Article, Category } = require('../database');
const { isAdmin } = require('../middleware/auth');


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
};

module.exports = { getArticles, showArticle, postArticles };