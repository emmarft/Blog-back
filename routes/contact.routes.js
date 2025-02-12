const express = require('express');
const router = express.Router();
const { } = require('../database');
const { postContact } = require('../controllers/ContactController');


// 1️⃣ Formulaire de contact
router.post('/contact', postContact);

// 2️⃣ Soumission de bons plans
/*router.post('/bons-plans', async (req, res) => {
    try {
        const { user_id, title, description } = req.body;
        if (!title || !description) return res.status(400).send('Le titre et la description sont requis');

        console.log(`Nouveau bon plan soumis: ${title} - ${description}`);
        res.status(201).send('Bon plan soumis');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la soumission du bon plan');
    }
});*/

module.exports = router;