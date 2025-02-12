const { Article, Category, sequelize } = require('../database');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Article,
                attributes: []
            }],
            attributes: [
                'id',
                'name',
                'description',
                [sequelize.fn('COUNT', sequelize.col('Articles.id')), 'articleCount']
            ],
            group: ['Category.id']
        });
        res.json(categories);
    } catch (error) {
        console.error(error);  // Ajoute plus de détails ici pour faciliter le débogage
        res.status(500).send('Erreur lors de la récupération des catégories : ' + error.message);  // Renvoie l'erreur détaillée
    }
};

const showCategories =  async (req, res) => {
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
};

const postCategories = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send("Le nom de la catégorie est obligatoire");
        }

        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de la catégorie");
    }
};

const putCategories = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        // Récupérer `name` et `description` depuis le body
        const { name, description } = req.body;

        // Mettre à jour la catégorie avec `name` et `description`
        await category.update({ name, description });

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de la catégorie");
    }
};

const deleteCategories = async (req, res) => {
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
};

module.exports = { 
    getCategories, 
    showCategories, 
    postCategories, 
    putCategories, 
    deleteCategories 
};