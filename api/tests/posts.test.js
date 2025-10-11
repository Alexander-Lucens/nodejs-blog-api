/*
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Post = require('../models/postModel');
const User = require('../models/userModel');

let token;
let testUserId;

let tokenAdmin;
let testAdminUserId;

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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

    const testAdmin = await User.create({
        role: 'admin',
        name: 'Test Admin User',
        email: 'testAdmin@example.com',
        password: 'password123',
        passwordConfirm: 'password123'
    });

    testUserId = testUser._id;
    token = jwt.sign({ id: testUserId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    testAdminUserId = testAdmin._id;
    tokenAdmin = jwt.sign({ id: testAdminUserId }, process.env.JWT_SECRET, { expiresIn: '1h' });

});

afterEach(async () => {
    await Post.deleteMany();
});

afterAll(async () => {
	await User.findByIdAndDelete(testUserId);
    await User.findByIdAndDelete(testAdminUserId);
    await mongoose.connection.close();
});

describe('Post API', () => {

    // --- CREATE ---
    // --- TEST CREATE success /api/posts/:id (token required) ---
    it('should Create post & return 201', async () => {
        const post = { author: testUserId, title: 'Original Title', body: 'Original Body' };

        const res = await request(app)
            .post(`/api/posts`)
            .set('Authorization', `Bearer ${token}`)
            .send(post);

        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.post.title).toBe('Original Title');
        expect(res.body.data.post.body).toBe('Original Body');
    });

    // --- TEST CREATE error 400, without title /api/posts/:id (token required) ---
    it('should Create post & return 201', async () => {
        const post = { author: testUserId, body: 'Original Body' };

        const res = await request(app)
            .post(`/api/posts`)
            .set('Authorization', `Bearer ${token}`)
            .send(post);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toBe('fail');
        expect(res.body.message).toBe('Invalid input data.');
    });

    // --- TEST CREATE error 400, without body /api/posts/:id (token required) ---
    it('should Create post & return 201', async () => {
        const post = { author: testUserId, title: 'Original Title' };

        const res = await request(app)
            .post(`/api/posts`)
            .set('Authorization', `Bearer ${token}`)
            .send(post);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toBe('fail');
        expect(res.body.message).toBe('Invalid input data.');
    });

    // --- GET ---
    // --- TEST GET /api/posts ---
    it('should GET all posts', async () => {
        await Post.create({ author: testUserId, title: 'Test Post 1', body: 'This is a test.' });
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.posts[0].title).toBe('Test Post 1');
    });

    // --- TEST GET ONE /api/posts/:id (token required) ---
    it('should CREATE a new post and try to access it', async () => {
        const post = await Post.create({ author: testUserId, title: 'Original Title', body: 'Original Body' });

        const res = await request(app)
            .get(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.post.title).toBe('Original Title');
    });

    // --- TEST GET ONE NOT EXISTED POST /api/posts/:id (token required) ---    
    it('should try to GET post by ID but fail', async () => {
        const post_id = '68c69327f6e8721fe5a6b4ad';
        const res = await request(app)
            .get(`/api/posts/${post_id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Post not found!');
    });

    // --- TEST PATCH /api/posts/:id (token required) ---
    it('should PATCH a post by ID', async () => {
        const post = await Post.create({ author: testUserId, title: 'Original Title', body: 'Original Body' });
        const updatedData = { title: 'Updated Title' };

        const res = await request(app)
            .patch(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.post.title).toBe('Updated Title');
    });

    // Post NOT exist
    it('should try to PATCH post by ID but fail', async () => {
        const post_id = '68c69327f6e8721fe5a6b4ad';

        const res = await request(app)
            .patch(`/api/posts/${post_id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Post not found!');
    });

    // --- TEST DELETE /api/posts/:id (token required) ---
    it('should DELETE a post by ID', async () => {
        const post = await Post.create({ author: testUserId, title: 'To Be Deleted', body: '...' });

        const res = await request(app)
            .delete(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`);
        
        expect(res.statusCode).toEqual(204);

        const deletedPost = await Post.findById(post._id);
        expect(deletedPost).toBeNull();
    });

    // --- TEST DELETE /api/posts/:id (token required) ---
    it('should fail DELETE, cause user is not admin', async () => {
        const post = await Post.create({ author: testUserId, title: 'To Be Deleted', body: '...' });

        const res = await request(app)
            .delete(`/api/posts/${post._id}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toBe('Permission denied!');
    });

    // Post NOT exist
    it('should try to DELETE post by ID but fail', async () => {
        const post_id = '68c69327f6e8721fe5a6b4ad';

        const res = await request(app)
            .delete(`/api/posts/${post_id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Post not found!');
    });

});


*/