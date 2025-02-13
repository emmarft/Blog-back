const express = require('express');
const router = express.Router();
const { getStatistics, postLogin, getUsers, postRegister, putUsers, deleteUsers } = require('../controllers/UserController');

// 1️⃣ Récupérer les statistiques
router.get('/admin/statistiques', getStatistics);

// 3️⃣ Connexion de l'utilisateur (authentification)
router.post('/login', postLogin);

// 2️⃣ Gestion des utilisateurs (liste)
router.get('/admin/utilisateurs', getUsers);

router.post('/register', postRegister);

router.put('/admin/utilisateurs', putUsers);

// 3️⃣ Suppression d’un utilisateur
router.delete('/admin/utilisateurs/:id', deleteUsers);

module.exports = router;