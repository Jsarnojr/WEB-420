// src/app.js
const express = require('express');
const app = express();

// In-memory mock database for this example (can replace with database calls)
let books = [];

app.use(express.json()); // Middleware to parse JSON bodies

// POST route to add a new book
app.post('/api/books', (req, res) => {
    try {
        const { id, title, author } = req.body;

        // Check if the title is missing
        if (!title) {
            throw new Error('Book title is required');
        }

        const newBook = { id, title, author };
        books.push(newBook);

        return res.status(201).json(newBook); // Return 201-status code when book is added successfully
    } catch (error) {
        if (error.message === 'Book title is required') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route to delete a book by id
app.delete('/api/books/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Input must be a number' });
        }

        // Find the index of the book with the matching id
        const bookIndex = books.findIndex((book) => book.id === id);

        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Remove the book from the array
        books.splice(bookIndex, 1);

        return res.status(204).send(); // Return 204-status code for successful deletion
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update a book by id
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    try {
        // Check if id is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Input must be a number' });
        }

        // Check if title is provided
        if (!title) {
            return res.status(400).json({ error: 'Bad Request: Title is required' });
        }

        // Find the book in the mock database
        const bookIndex = books.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update the book in the database
        books[bookIndex] = { id, title, author };

        // Respond with 204 status code for successful update
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = app;
