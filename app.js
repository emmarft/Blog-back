const express = require('express');
const app = express();
const cors = require('cors');
// DB
const { initDB } = require('./database');
initDB();

app.use(express.json()); 
app.use(cors());

const articlesRoutes = require('./routes/articles.routes');
const categoriesRoutes = require('./routes/categories.routes');
const commentairesRoutes = require('./routes/commentaires.routes');
const contactRoutes = require('./routes/contact.routes');
const usersRoutes = require('./routes/users.routes');

app.use("/", articlesRoutes, categoriesRoutes, commentairesRoutes, contactRoutes, usersRoutes);

// Configuration du serveur
if (require.main === module) {
    // Ce bloc ne s'exécutera que si ce fichier est exécuté directement (pas en tant que module importé)
    const hostname = '127.0.0.1';
    const port = process.env.PORT || 3000;
    app.listen(port, hostname, () => {
        console.log(`Serveur démarré sur http://${hostname}:${port}`);
    });
}

module.exports = app;  // Exporte l'application pour les tests
