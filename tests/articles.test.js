const request = require('supertest');
const app = require('../app');
const http = require('http');

let server;
let createdArticleId; // Variable pour stocker l'ID de l'article créé

beforeAll(async () => {
    server = http.createServer(app);
    process.env.PORT = '0';
    return new Promise(resolve => {
        server.listen(process.env.PORT, () => resolve());
    });
});

afterAll(() => {
    return new Promise(resolve => {
        server.close(() => resolve());
    });
});

describe('Tests pour les articles', () => {

    it('devrait récupérer tous les articles', async () => {
        const response = await request(app).get('/articles');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('devrait créer un nouvel article', async () => {
        const newArticle = {
            title: `Test Article ${Date.now()}`,
            content: "Content of the test article",
            image_url: "https://example.com/image.jpg",
            category_id: 1,
            user_id: 1
        };

        const response = await request(app).post('/articles').send(newArticle);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        createdArticleId = response.body.id; // Stocker l'ID de l'article créé
    });

    it('devrait récupérer un article par ID', async () => {
        const response = await request(app).get(`/article/${createdArticleId}`); // Utiliser l'ID stocké
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdArticleId); // Vérifier avec l'ID stocké
    });

    it('devrait mettre à jour un article', async () => {
        const updateArticle = {
            title: 'Updated Title',
            content: 'Updated content'
        };

        const response = await request(app).put(`/articles/${createdArticleId}`).send(updateArticle); // Utiliser l'ID stocké
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Title');
    });

    it('devrait supprimer un article', async () => {
        const response = await request(app).delete(`/articles/${createdArticleId}`); // Utiliser l'ID stocké
        expect(response.status).toBe(200);
        expect(response.text).toBe('Article supprimé avec succès');
    });

    it('ne devrait pas autoriser les non-administrateurs à publier des articles', async () => {
        const res = await request(app).post('/articles').send({ title: 'Test', content: 'Content' });
        expect(res.status).toBe(403);
    });

});