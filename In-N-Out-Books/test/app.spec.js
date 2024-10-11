// src/app.spec.js
const request = require('supertest');
const app = require('../src/app.js');

describe('Chapter 1: API Tests', () => {
    describe('POST /api/users/:email/verify-security-question', () => {
        // Test case for successful security question verification
        it('Should return a 200 status with "Security questions successfully answered" message', async () => {
            const res = await request(app)
                .post('/api/users/user@example.com/verify-security-question')
                .send({
                    answer1: 'Fluffy',
                    answer2: 'Blue'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Security questions successfully answered');
        });

        // Test case for incorrect answers
        it('Should return a 401 status code with "Unauthorized" message when security questions are incorrect', async () => {
            const res = await request(app)
                .post('/api/users/user@example.com/verify-security-question')
                .send({
                    answer1: 'WrongName',
                    answer2: 'WrongColor'
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('message', 'Unauthorized');
        });

        // Test case for invalid request body
        it('Should return a 400 status code with "Bad Request" message when request body fails ajv validation', async () => {
            const res = await request(app)
                .post('/api/users/user@example.com/verify-security-question')
                .send({
                    answer1: 'Fluffy'
                    // Missing answer2
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Bad Request');
        });
    });
});
