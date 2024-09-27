// database/users.js
const bcrypt = require('bcryptjs');

// Hashing password for storage in the mock database
const hashedPassword = bcrypt.hashSync('password123', 10);

const users = [
    {
        email: 'johndoe@example.com',
        password: hashedPassword  // Hashed password stored in the DB
    }
];

module.exports = users;
