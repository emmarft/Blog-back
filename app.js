const express = require('express');
const app = express();
const cors = require('cors');

// DB
const { initDB } = require('./database');
initDB();

// Middleware pour le traitement des requêtes JSON
app.use(express.json());

// CORS : Autoriser plusieurs origines
const allowedOrigins = [
    'http://82.66.147.237',       // IP publique
    'http://192.168.1.103',       // IP locale
    'http://localhost:3001'       // Pour les tests locaux
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
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
    app.listen(port, hostname, () => {
        console.log(`Serveur démarré sur http://${hostname}:${port}`);
    });
}
