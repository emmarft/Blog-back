const express = require('express');
const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

// Page Produits
router.get('/produits', (req, res) => {
  res.render('produits', { title: 'Produits' });
});

// Page Cas d'usage
router.get('/cas-d-usage', (req, res) => {
  res.render('cas-d-usage', { title: 'Cas d\'usage' });
});

// Page Ressources
router.get('/ressources', (req, res) => {
  res.render('ressources', { title: 'Ressources' });
});

// Page À propos
router.get('/a-propos', (req, res) => {
  res.render('a-propos', { title: 'À propos' });
});

// Page Contact
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
