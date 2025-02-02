const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false // Désactive les logs SQL dans la console
});

// Définition des modèles Sequelize

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'editor', 'reader'), defaultValue: 'reader' },
    created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

const Article = sequelize.define('Article', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

const NewsletterSubscriber = sequelize.define('NewsletterSubscriber', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

const Like = sequelize.define('Like', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
}, { timestamps: false });

// Définition des relations

User.hasMany(Article, { foreignKey: 'user_id', onDelete: 'SET NULL' });
Article.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Article, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Article.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Article.hasMany(Comment, { foreignKey: 'article_id', onDelete: 'CASCADE' });
Comment.belongsTo(Article, { foreignKey: 'article_id' });

User.belongsToMany(Article, { through: Like, foreignKey: 'user_id' });
Article.belongsToMany(User, { through: Like, foreignKey: 'article_id' });

// Synchronisation de la base de données
const initDB = async () => {
    try {
        await sequelize.sync({ force: false }); // Force à false pour ne pas supprimer les données existantes
        console.log('Base de données synchronisée');
    } catch (error) {
        console.error('Erreur lors de la synchronisation de la base de données:', error);
    }
};

// Exporte les modèles et l'instance de Sequelize
module.exports = { sequelize, initDB, User, Category, Article, Comment, NewsletterSubscriber, Like };
