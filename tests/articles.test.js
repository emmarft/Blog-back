const request = require('supertest');
const app = require('../app'); // si votre app est définie ici
const http = require('http');

let server;

// Avant tous les tests
beforeAll(() => {
    server = http.createServer(app);
    process.env.PORT = '0';  // Utilise un port libre aléatoire
    return new Promise(resolve => {
        server.listen(process.env.PORT, () => resolve());
    });
});

// Après tous les tests
afterAll(() => {
    return new Promise(resolve => {
        server.close(() => resolve());
    });
});

describe('Tests pour les articles', () => {

    // Test pour récupérer tous les articles
    it('devrait récupérer tous les articles', async () => {
        const response = await request(app).get('/articles');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test pour créer un nouvel article
    it('devrait créer un nouvel article', async () => {
        const newArticle = {
            title: `Test Article ${Date.now()}`,  // Ajout d'un timestamp pour rendre le titre unique
            content: "Content of the test article",
            image_url: "https://example.com/image.jpg",
            category_id: 1,   // Assure-toi que cette catégorie existe dans la base
            user_id: 1        // Assure-toi que cet utilisateur existe
        };
    
        const response = await request(app).post('/articles').send(newArticle);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
    

    // Test pour récupérer un article par ID
    it('devrait récupérer un article par ID', async () => {
        const response = await request(app).get('/article/37');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 37);
    });

    it('devrait mettre à jour un article', async () => {
        const updateArticle = {
            title: 'Updated Title',
            content: 'Updated content'
        };

        const response = await request(app).put('/articles/37').send(updateArticle);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Title');
    });

    it('devrait supprimer un article', async () => {
        const response = await request(app).delete('/articles/37');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Article supprimé avec succès');
    });

    it('ne devrait pas autoriser les non-administrateurs à publier des articles', async () => {
        const res = await request(app).post('/articles').send({ title: 'Test', content: 'Content' });
        expect(res.status).toBe(403); 
      });
      

});
