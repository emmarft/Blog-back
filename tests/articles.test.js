const request = require('supertest');
const app = require('../app'); // si votre app est définie ici

describe('Tests pour les articles', () => {
  
  // Test pour récupérer tous les articles
  it('devrait récupérer tous les articles', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test pour récupérer un article par ID
  it('devrait récupérer un article par ID', async () => {
    const response = await request(app).get('/article/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  // Test pour créer un nouvel article
  it('devrait créer un nouvel article', async () => {
    const newArticle = {
      title: 'Test Article',
      content: 'Content of the test article',
      category_id: 1,
      user_id: 1
    };

    const response = await request(app).post('/articles').send(newArticle);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('devrait mettre à jour un article', async () => {
    const updateArticle = {
      title: 'Updated Title',
      content: 'Updated content'
    };

    const response = await request(app).put('/articles/1').send(updateArticle);
    expect(response.status).toBe(200); 
    expect(response.body.title).toBe('Updated Title'); 
  });

  it('devrait supprimer un article', async () => {
    const response = await request(app).delete('/articles/1');
    expect(response.status).toBe(200); 
    expect(response.text).toBe('Article supprimé avec succès'); 
  });

  
  it('ne devrait pas autoriser les non-administrateurs à publier des articles', async () => {
    const res = await request(app).post('/articles').send({ title: 'Test', content: 'Content' });
    expect(res.status).toBe(401); 
  });
  
});
