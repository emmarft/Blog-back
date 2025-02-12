const request = require('supertest');
const app = require('../app'); // Assurez-vous que le chemin est correct
const http = require('http');
const { Category } = require('../database'); // Importez votre modèle Category

let server;

beforeAll(async () => {
    server = http.createServer(app);
    process.env.PORT = '0';
    return new Promise(resolve => {
        server.listen(process.env.PORT, () => resolve());
    });
});

afterAll(async () => {
    return new Promise(resolve => {
        server.close(() => resolve());
    });
});

describe('Tests pour les catégories', () => {

    it('devrait récupérer toutes les catégories avec le nombre d\'articles', async () => {
        const response = await request(app).get('/categories');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        // Vérifiez que chaque catégorie a les propriétés attendues
        response.body.forEach(category => {
            expect(category).toHaveProperty('id');
            expect(category).toHaveProperty('name');
            expect(category).toHaveProperty('description');
            expect(category).toHaveProperty('articleCount');
            expect(typeof category.articleCount).toBe('number'); // articleCount doit être un nombre
        });
    });

    it('devrait récupérer une catégorie par ID', async () => {
        // Créez d'abord une catégorie pour avoir un ID à récupérer
        const newCategory = await Category.create({ name: 'Test Catégorie' });

        const response = await request(app).get(`/categories/${newCategory.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', newCategory.id);
        expect(response.body).toHaveProperty('name', newCategory.name);

        // Supprimez la catégorie après le test
        await Category.destroy({ where: { id: newCategory.id } });
    });

    it('devrait créer une nouvelle catégorie', async () => {
        const newCategory = { name: 'Nouvelle Catégorie Test' };
        const response = await request(app).post('/categories').send(newCategory);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', newCategory.name);

        // Supprimez la catégorie après le test
        await Category.destroy({ where: { id: response.body.id } });
    });

    it('devrait mettre à jour une catégorie', async () => {
        // Créez d'abord une catégorie à mettre à jour
        const categoryToUpdate = await Category.create({ name: 'Catégorie à mettre à jour' });

        const updatedCategory = { name: 'Nom Catégorie Mis à Jour', description: 'Description mise à jour' };
        const response = await request(app).put(`/categories/${categoryToUpdate.id}`).send(updatedCategory);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedCategory.name);
        expect(response.body.description).toBe(updatedCategory.description);

        // Supprimez la catégorie après le test
        await Category.destroy({ where: { id: categoryToUpdate.id } });
    });

    it('devrait supprimer une catégorie', async () => {
        // Créez d'abord une catégorie à supprimer
        const categoryToDelete = await Category.create({ name: 'Catégorie à supprimer' });

        const response = await request(app).delete(`/categories/${categoryToDelete.id}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Catégorie supprimée avec succès');

        // Essayez de récupérer la catégorie supprimée, elle ne devrait plus exister
        const getResponse = await request(app).get(`/categories/${categoryToDelete.id}`);
        expect(getResponse.status).toBe(404);
    });

    // Test pour gérer les erreurs (ex: nom manquant lors de la création)
    it('devrait retourner une erreur si le nom est manquant lors de la création', async () => {
        const response = await request(app).post('/categories').send({}); // Envoi d'un objet vide
        expect(response.status).toBe(400);
        expect(response.text).toBe("Le nom de la catégorie est obligatoire");
    });
});