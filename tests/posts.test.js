const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Post = require('../models/postModel');
const User = require('../models/userModel');

let token;
let testUserId;

const dotenv = require('dotenv');

dotenv.config({ path: ".env"});

beforeAll(async () => {
    const TEST_DB_URL = process.env.TEST_DB_URL;
    if (!TEST_DB_URL) {
        throw new Error('TEST_DB_URL is not defined in .env');
    }
    await mongoose.connect(TEST_DB_URL);

    const testUser = await User.create({
        name: 'Test User',
        email: 'test12@example.com',
        password: 'password123',
        passwordConfirm: 'password123'
    });
    testUserId = testUser._id;
    token = jwt.sign({ id: testUserId }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterEach(async () => {
    await Post.deleteMany();
});

afterAll(async () => {
	await User.findByIdAndDelete(testUserId); 
    await mongoose.connection.close();
});

describe('Post API', () => {

    // --- TEST GET /api/posts ---
    it('should GET all posts', async () => {
        await Post.create({ title: 'Test Post 1', body: 'This is a test.' });
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data[0].title).toBe('Test Post 1');
    });

    // --- TEST PATCH /api/posts/:id (token required) ---
    it('should PATCH a post by ID', async () => {
        const post = await Post.create({ title: 'Original Title', body: 'Original Body' });
        const updatedData = { title: 'Updated Title' };

        const res = await request(app)
            .patch(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.title).toBe('Updated Title');
    });

    // --- TEST DELETE /api/posts/:id (token required) ---
    it('should DELETE a post by ID', async () => {
        const post = await Post.create({ title: 'To Be Deleted', body: '...' });

        const res = await request(app)
            .delete(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`); // 6. Прикрепляем токен к запросу
        
        expect(res.statusCode).toEqual(204);

        const deletedPost = await Post.findById(post._id);
        expect(deletedPost).toBeNull();
    });

});