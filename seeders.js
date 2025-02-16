const bcrypt = require('bcryptjs');
const { User, Category, Article, Comment, NewsletterSubscriber, Like } = require('./database.js');

const seedDatabase = async () => {
    try {

        const hashedPasswords = await Promise.all([
            bcrypt.hash('password', 10), 
            bcrypt.hash('password', 10),  
            bcrypt.hash('password', 10), 
        ]);
        // 1. Création des utilisateurs
        const users = await User.bulkCreate([
            { username: 'admin', email: 'emma@gmail.com', password: hashedPasswords[0], role: 'admin' },
            { username: 'editor1', email: 'editor1@example.com', password: hashedPasswords[1], role: 'editor' },
            { username: 'reader1', email: 'reader1@example.com', password: hashedPasswords[2], role: 'reader' }
        ], { ignoreDuplicates: true });

        // 2. Création des catégories
        const categories = await Category.bulkCreate([
            { id: 1, name: "Beauté", description: "Destinations et astuces de voyage" },
            { id: 2, name: "Voyage", description: "Conseils et tendances beauté" },
            { id: 3, name: "Lifestyle", description: "Art de vivre et quotidien" },
            { id: 4, name: "Nutrition", description: "Alimentation et bien-être" },
            { id: 5, name: "Mode", description: "Tendances et conseils mode" },
            { id: 6, name: "Bien-être", description: "Santé et développement personnel" },
            { id: 7, name: "Décoration", description: "Design d'intérieur et DIY" },
            { id: 8, name: "Culture", description: "Livres, films et arts" },
            { id: 9, name: "Créativité", description: "Projets créatifs et inspiration" },
            { id: 10, name: "Finance", description: "Gestion de budget et astuces financières" },
            { id: 11, name: "Sport & Fitness", description: "Entraînements et conseils sportifs" }
          ]);          

        // 3. Création des articles
        const articles = await Article.bulkCreate([
            {
                title: "Comment voyager à petits prix",
                resume: "Vous voulez voyager en ayant un petit budget ? Voici les 7 choses à savoir avant de partir en vacances.",
                content: "Vous voulez voyager en ayant un petit budget ? Voici les 7 choses à savoir avant de partir en vacances.",
                image_url: "https://i.pinimg.com/736x/85/ca/1a/85ca1ae58a174cacc3eb503af6c27c15.jpg",
                category_id: categories[2].id,
                user_id: users[1].id
            },
            {
                title: "Economiser sur ses achats du quotidien",
                resume: "Que ça soit pour des courses, des vêtements, des bijoux, de l'electronique ou même des meubles, voici comment economiser votre argent",
                content: "Que ça soit pour des courses, des vêtements, des bijoux, de l'electronique ou même des meubles, voici comment economiser votre argent",
                image_url: "https://i.pinimg.com/736x/2a/30/99/2a3099d710c520287ef65304bc23a13e.jpg",
                category_id: categories[3].id,
                user_id: users[1].id
            },
            {
                title: "Où boire un verre pas cher ? Les meilleurs Happy Hours à Bordeaux",
                resume: "Découvrez où boire un verre à petit prix avec les bons plans Happy Hour à Bordeaux !",
                content: "Découvrez où boire un verre à petit prix avec les bons plans Happy Hour à Bordeaux !",
                image_url: "https://i.pinimg.com/474x/f5/4c/d8/f54cd8d8e47c24291fddf03d0a109191.jpg",
                category_id: categories[3].id,
                user_id: users[1].id
            },
            {
                title: "Les secrets d'une peau éclatante naturellement",
                resume: "Découvrez les meilleures astuces naturelles pour une peau rayonnante et en bonne santé.",
                content: "Découvrez les meilleures astuces naturelles pour une peau rayonnante et en bonne santé.",
                image_url: "https://i.pinimg.com/736x/e5/2d/88/e52d88554c22b8c8fade93beabb7282d.jpg",
                category_id: categories[6].id,
                user_id: users[1].id
            },
            {
                title: "Les destinations incontournables et abordables pour 2025",
                resume: "Des plages paradisiaques aux villes dynamiques, découvrez les lieux à visiter absolument cette année.",
                content: "Des plages paradisiaques aux villes dynamiques, découvrez les lieux à visiter absolument cette année.",
                image_url: "https://i.pinimg.com/736x/4b/c9/4a/4bc94ac411d499939ba06ef672ebc565.jpg",
                category_id: categories[2].id,
                user_id: users[1].id
            },
            {
                title: "Comment voyager en solo en toute sécurité",
                resume: "Vous rêvez de partir seul à l'aventure ? Voici les conseils essentiels pour un voyage réussi et sans stress.",
                content: "Vous rêvez de partir seul à l'aventure ? Voici les conseils essentiels pour un voyage réussi et sans stress.",
                image_url: "https://i.pinimg.com/736x/43/ac/a5/43aca5bb935086625c2507a7cbb26a1e.jpg",
                category_id: categories[2].id,
                user_id: users[1].id
            },
            {
                title: "Minimalisme : Comment adopter un mode de vie simple et heureux",
                resume: "Découvrez les bienfaits du minimalisme et comment désencombrer votre quotidien.",
                content: "Découvrez les bienfaits du minimalisme et comment désencombrer votre quotidien.",
                image_url: "https://i.pinimg.com/736x/45/d6/d4/45d6d4e71b96f192736f8a66b3e999af.jpg",
                category_id: categories[3].id,
                user_id: users[1].id
            },
            {
                title: "Les super-aliments à intégrer dans votre alimentation",
                resume: "Boostez votre santé avec ces aliments aux multiples bienfaits.",
                content: "Boostez votre santé avec ces aliments aux multiples bienfaits.",
                image_url: "https://i.pinimg.com/736x/1d/6f/3f/1d6f3f37e44c5fa1a7dae66ee6f969a0.jpg",
                category_id: categories[4].id,
                user_id: users[1].id
            },
            {
                title: "Maquillage 2025 : 5 tendances faciles et abordables à adopter",
                resume: "Envie de rester à la pointe des tendances beauté ? Voici les styles de maquillage qui vont cartonner cette année.",
                content: "Envie de rester à la pointe des tendances beauté ? Voici les styles de maquillage qui vont cartonner cette année.",
                image_url: "https://i.pinimg.com/736x/67/29/33/67293309959c37660af58c86c21bebde.jpg",
                category_id: categories[2].id,
                user_id: users[1].id
            },
            {
                title: "Les pièces intemporelles à avoir dans son dressing",
                resume: "Découvrez les basiques mode indispensables pour un style chic et durable.",
                content: "Découvrez les basiques mode indispensables pour un style chic et durable.",
                image_url: "https://i.pinimg.com/736x/5c/71/32/5c713230bf8db3ceb5801ca5a36cedd9.jpg",
                category_id: categories[5].id,
                user_id: users[1].id
            },
            {
                title: "Batch Cooking : Comment préparer vos repas pour la semaine",
                resume: "Gagnez du temps et mangez sainement avec cette méthode efficace de préparation des repas.",
                content: "Gagnez du temps et mangez sainement avec cette méthode efficace de préparation des repas.",
                image_url: "https://i.pinimg.com/736x/98/d0/a3/98d0a3dbb4311be1c5a1ac7b84918e40.jpg",
                category_id: categories[4].id,
                user_id: users[1].id
            },
            {
                title: "Comment bien choisir ses vêtements selon sa morphologie",
                resume: "Astuces pour trouver les coupes qui mettent en valeur votre silhouette.",
                content: "Astuces pour trouver les coupes qui mettent en valeur votre silhouette.",
                image_url: "https://i.pinimg.com/736x/aa/8e/d0/aa8ed063852b142202947ac81c1285cf.jpg",
                category_id: categories[5].id,
                user_id: users[1].id
            }
        ]);

        // 4. Création des commentaires
        await Comment.bulkCreate([
            {
                content: 'Super article ! Merci pour les conseils.',
                user_id: users[2].id,
                article_id: articles[0].id
            },
            {
                content: 'Je vais appliquer ces astuces dès mon prochain voyage !',
                user_id: users[1].id,
                article_id: articles[1].id
            }
        ]);

        // 5. Création des abonnés à la newsletter
        await NewsletterSubscriber.bulkCreate([
            { email: 'subscriber1@example.com' },
            { email: 'subscriber2@example.com' }
        ]);

        // 6. Ajout des "Likes" sur les articles
        await Like.bulkCreate([
            { user_id: users[2].id, article_id: articles[0].id },
            { user_id: users[0].id, article_id: articles[1].id }
        ]);

        console.log('Données de départ insérées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l’insertion des données de départ :', error);
    }
};

// Appel de la fonction de seed
seedDatabase();
