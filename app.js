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

// Export de l'application sans écoute directe
module.exports = app;

// Si nécessaire, démarrez le serveur (optionnel, utilisé hors tests)
if (require.main === module) {
    const hostname = '0.0.0.0';
    const port = process.env.PORT || 3000;
    app.listen(port, hostname, () => {
        console.log(`Serveur démarré sur http://${hostname}:${port}`);
    });
}
