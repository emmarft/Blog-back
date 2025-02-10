const express = require('express');
const router = express.Router();
const {  } = require('../database');


// 1️⃣ Formulaire de contact
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) return res.status(400).send('Tous les champs sont requis');
        
        console.log(`Nouveau message de contact: ${name} - ${email}: ${message}`);
        res.status(200).send('Message envoyé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l’envoi du message');
    }
});

// 2️⃣ Soumission de bons plans
router.post('/bons-plans', async (req, res) => {
    try {
        const { user_id, title, description } = req.body;
        if (!title || !description) return res.status(400).send('Le titre et la description sont requis');
        
        console.log(`Nouveau bon plan soumis: ${title} - ${description}`);
        res.status(201).send('Bon plan soumis');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la soumission du bon plan');
    }
});

module.exports = router;