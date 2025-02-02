const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// Configuration de l'application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation des routes
app.use('/', routes);

// Démarrage du serveur
const PORT = process.env.PORT || 3077;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
