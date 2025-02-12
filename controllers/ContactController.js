const postContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) return res.status(400).send('Tous les champs sont requis');

        console.log(`Nouveau message de contact: ${name} - ${email}: ${message}`);
        res.status(200).send('Message envoyé');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l’envoi du message');
    }
};

module.exports = { 
    postContact,
};