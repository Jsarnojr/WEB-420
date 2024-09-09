// src/app.js
const express = require('express');
const app = express();
const collections = require('../database/collections'); // This should be correct
const books = collections.books;

// Routes and other code
