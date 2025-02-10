const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Article, Comment, User } = require('../database');


// 1️⃣ Récupérer les statistiques
router.get('/admin/statistiques', async (req, res) => {
    try {
        const stats = {
            totalArticles: await Article.count(),
            totalCommentaires: await Comment.count(),
            totalUtilisateurs: await User.count(),
        };
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des statistiques');
    }
});

// 2️⃣ Gestion des utilisateurs (liste)
router.get('/admin/utilisateurs', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nom, email et mot de passe sont requis." });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: name,
            email,
            password: hashedPassword,
            role: role || 'reader' 
        });

        res.status(201).json({ message: "Utilisateur créé avec succès.", user: newUser });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

router.put('/admin/utilisateurs', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

// 3️⃣ Suppression d’un utilisateur
router.delete('/admin/utilisateurs/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send('Utilisateur non trouvé');
        await user.destroy();
        res.send('Utilisateur supprimé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression de l’utilisateur');
    }
});

module.exports = router;