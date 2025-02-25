const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
console.log("CORS_ORIGINS:", process.env.CORS_ORIGINS);


// DB
const { initDB } = require('./database');
initDB();

// Middleware pour le traitement des requêtes JSON
app.use(express.json());


// CORS : Autoriser plusieurs origines
const corsOptions = {
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Importation des routes
const articlesRoutes = require('./routes/articles.routes');
const categoriesRoutes = require('./routes/categories.routes');
const commentairesRoutes = require('./routes/commentaires.routes');
const contactRoutes = require('./routes/contact.routes');
const usersRoutes = require('./routes/users.routes');

// Utilisation des routes
app.use("/", articlesRoutes, categoriesRoutes, commentairesRoutes, contactRoutes, usersRoutes);

// Export de l'application
module.exports = app;

// Démarrer le serveur si ce fichier est exécuté directement
if (require.main === module) {
    const hostname = '0.0.0.0';
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
}