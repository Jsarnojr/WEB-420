const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

let books = []; // In-memory mock database (array of book objects)

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

module.exports = app;
