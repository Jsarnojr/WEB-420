const request = require('supertest');
const app = require('../src/app');

describe('Chapter X: API Tests', () => {
    let mockBook = { id: '1', title: 'Mock Book', author: 'John Doe' };

    // Test case for adding a new book (success)
    it('Should return a 201-status code when adding a new book', async () => {
        const res = await request(app)
            .post('/api/books')
            .send(mockBook);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title', mockBook.title);
        expect(res.body).toHaveProperty('author', mockBook.author);
    });

    // Test case for adding a new book with missing title (error)
    it('Should return a 400-status code when adding a new book with missing title', async () => {
        const incompleteBook = { id: '2', author: 'Jane Doe' };

        const res = await request(app)
            .post('/api/books')
            .send(incompleteBook);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Book title is required');
    });

    // Test case for deleting a book by id (success)
    it('Should return a 204-status code when deleting a book', async () => {
        // First, add a book to delete
        await request(app).post('/api/books').send(mockBook);

        // Delete the book
        const res = await request(app).delete(`/api/books/${mockBook.id}`);

        expect(res.statusCode).toEqual(204);
    });

    // Test case for updating a book and returning a 204-status code (success)
    it('Should update a book and return a 204-status code', async () => {
        const updatedBook = { title: 'Updated Mock Book', author: 'John Doe' };

        const res = await request(app)
            .put(`/api/books/${mockBook.id}`)
            .send(updatedBook);

        expect(res.statusCode).toEqual(204);
    });

    // Test case for non-numeric id
    it('Should return a 400-status code when using a non-numeric id', async () => {
        const updatedBook = { title: 'Updated Mock Book', author: 'John Doe' };

        const res = await request(app)
            .put('/api/books/foo')
            .send(updatedBook);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Input must be a number'); // Updated to check 'error'
    });

    // Test case for updating a book with missing title
    it('Should return a 400-status code when updating a book with missing title', async () => {
        const incompleteBook = { author: 'John Doe' };

        const res = await request(app)
            .put(`/api/books/${mockBook.id}`)
            .send(incompleteBook);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Bad Request'); // Updated to check 'error'
    });
});
