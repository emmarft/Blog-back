const express = require('express');
const app = express();
const cors = require('cors');

// DB
const { initDB } = require('./database');
initDB();

// Middleware pour le traitement des requêtes JSON
app.use(express.json()); 

// CORS : Autoriser le front-end sur le port 3001
const corsOptions = {
    origin: 'http://82.66.147.237:3001',  // Permet uniquement les requêtes venant du front-end sur ce port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Si tu veux restreindre les méthodes autorisées
};

app.use(cors(corsOptions));  // Applique CORS avec les options définies

// Importation des routes
const articlesRoutes = require('./routes/articles.routes');
const categoriesRoutes = require('./routes/categories.routes');
const commentairesRoutes = require('./routes/commentaires.routes');
const contactRoutes = require('./routes/contact.routes');
const usersRoutes = require('./routes/users.routes');

// Utilisation des routes
app.use("/", articlesRoutes, categoriesRoutes, commentairesRoutes, contactRoutes, usersRoutes);

// Export de l'application sans écoute directe
module.exports = app;

// Si nécessaire, démarre le serveur (optionnel, utilisé hors tests)
if (require.main === module) {
    const hostname = '0.0.0.0';
    const port = process.env.PORT || 3000;
    app.listen(port, hostname, () => {
        console.log(`Serveur démarré sur http://${hostname}:${port}`);
    });
}
