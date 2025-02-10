const { User } = require('../database');

const isAdmin = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(403).json({ message: "Accès refusé. Identifiant utilisateur manquant." });
        }

        const user = await User.findByPk(user_id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Accès refusé. Seul l'administrateur peut poster un article." });
        }

        next(); // L'utilisateur est admin, il peut continuer
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = { isAdmin };
