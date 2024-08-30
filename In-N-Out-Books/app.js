// app.js
// Author: Joseph Sarno
// Date: 08/30/24
// File Name: app.js
// Description: Express application for "in-n-out-books" project

const express = require('express');
const app = express();

// Step 4: Add a GET route for the root URL ('/')
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>In-N-Out Books</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
                h1 { color: #333; }
                p { color: #666; }
            </style>
        </head>
        <body>
            <h1>Welcome to In-N-Out Books!</h1>
            <p>Your one-stop shop for the best books in and out of print.</p>
        </body>
        </html>
    `);
});

// Step 5: Middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// Step 5: Middleware for handling 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { error: err.stack })
    });
});

// Step 7: Export the Express application
module.exports = app;
