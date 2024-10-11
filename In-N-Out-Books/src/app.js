// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const Ajv = require('ajv');

const app = express();
const ajv = new Ajv();

app.use(bodyParser.json());

// Mock database for users and their security questions
const mockDatabase = {
    'user@example.com': {
        securityQuestion1: 'What is your pet’s name?',
        securityAnswer1: 'Fluffy',
        securityQuestion2: 'What is your favorite color?',
        securityAnswer2: 'Blue',
    },
};

// Validation schema for security questions
const securityQuestionSchema = {
    type: 'object',
    properties: {
        answer1: { type: 'string' },
        answer2: { type: 'string' },
    },
    required: ['answer1', 'answer2'],
};

// POST route to verify security questions
app.post('/api/users/:email/verify-security-question', async (req, res) => {
    try {
        const email = req.params.email;
        const validate = ajv.compile(securityQuestionSchema);
        const valid = validate(req.body);

        if (!valid) {
            return res.status(400).json({ message: 'Bad Request' });
        }

        const user = mockDatabase[email];
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { answer1, answer2 } = req.body;

        if (
            answer1 === user.securityAnswer1 &&
            answer2 === user.securityAnswer2
        ) {
            return res.status(200).json({ message: 'Security questions successfully answered' });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = app;
