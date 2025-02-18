const { Article, Comment, User } = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getStatistics = async (req, res) => {
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
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe sont requis." });
    }

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe blabla." });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            "JWT_SECRET",
            { expiresIn: '1h' }
        );

        // Retourner le token au client
        res.json({ message: "Authentification réussie", token });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
};

const postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nom, email et mot de passe sont requis." });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Vérifier s'il existe déjà un administrateur
        const adminCount = await User.count({ where: { role: 'admin' } });
        let role = 'reader'; // Rôle par défaut

        if (adminCount === 0) {
            // Si c'est le premier utilisateur, il devient admin
            role = 'admin';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: name,
            email,
            password: hashedPassword,
            role: role
        });

        res.status(201).json({ message: "Utilisateur créé avec succès.", user: newUser });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const putUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
};

const deleteUsers = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send('Utilisateur non trouvé');
        await user.destroy();
        res.send('Utilisateur supprimé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression de l’utilisateur');
    }
};

module.exports = {
    getStatistics,
    postLogin,
    getUsers,
    postRegister,
    putUsers,
    deleteUsers
};