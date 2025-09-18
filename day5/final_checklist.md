# Fullstack API from Scratch: A Comprehensive Checklist

This document provides a complete, step-by-step checklist for building a feature-rich REST API using Node.js, Express, and MongoDB. It covers the entire architecture and feature set developed during the 10-day learning sprint. Use this as a guide to rebuild the project from memory.

---

## Phase 1: Project Foundation & Setup

The goal of this phase is to establish the project structure, initialize dependencies, and create the core server and application files.

### 1.1. Initialize Project
- [ ] Create the root project directory.
- [ ] Initialize the project with `npm init -y` to create `package.json`.
- [ ] Create the `.gitignore` file and add entries for `node_modules/` and `.env`.

### 1.2. Install Core Dependencies
- [ ] Install primary dependencies: `npm install express mongoose dotenv`.
- [ ] Install development dependencies: `npm install nodemon --save-dev`.

### 1.3. Establish File Structure
- [ ] Create the main application directories: `controllers`, `models`, `routes`, `utils`, `config`.

### 1.4. Configure the Application Core
- [ ] Create `app.js`: This file will configure the Express application (middleware, routes) and export the `app` object.
- [ ] Create `server.js`: This will be the main entry point. It will import `app`, connect to the database, and start the server with `app.listen()`.
- [ ] Create the `.env` file and define initial variables: `PORT`, `NODE_ENV`, `DB_URL`, `DB_USER`, `DB_PASSWORD`.

### 1.5. Implement Database Connection
- [ ] Create `config/database.js`.
- [ ] Write an `async` function `connectDB` that uses `mongoose.connect()` with the URL from `process.env`.
- [ ] Add `try/catch` for robust error handling on connection failure.
- [ ] Call `connectDB()` in `server.js` before `app.listen()`.

---

## Phase 2: Core API Logic (Posts CRUD)

This phase focuses on building the primary resource of the API—the blog posts—using the MVC (Model-View-Controller) pattern.

### 2.1. Create the Post Model
- [ ] Create `models/postModel.js`.
- [ ] Define the `postSchema` with fields like `title` (String, required) and `body` (String, required).
- [ ] Add a `createdAt` field with a `default` value of `Date.now()`.
- [ ] Create and export the Mongoose model: `mongoose.model('Post', postSchema)`.

### 2.2. Create the Post Routes
- [ ] Create `routes/postRoutes.js`.
- [ ] Initialize `express.Router()`.
- [ ] Define the routes for the resource using `router.route()`:
    - `router.route('/')` for `GET` (get all) and `POST` (create one).
    - `router.route('/:id')` for `GET` (get one), `PATCH` (update one), and `DELETE` (delete one).
- [ ] Connect the routes to placeholder controller functions.
- [ ] Mount the router in `app.js` with a base path: `app.use('/api/posts', postRoutes)`.

### 2.3. Implement the Post Controller
- [ ] Create `controllers/postController.js`.
- [ ] Implement all five CRUD functions:
    - `getAllPosts`
    - `getPostById`
    - `createPost`
    - `updatePost`
    - `deletePost`
- [ ] Use Mongoose methods for database interaction (`.find()`, `.findById()`, `.create()`, `.findByIdAndUpdate()`, `.findByIdAndDelete()`).

---

## Phase 3: Advanced Features & Error Handling

This phase makes the API more robust, professional, and feature-rich.

### 3.1. Implement a Centralized Error Handling System
- [ ] Create the `utils/appError.js` class that extends `Error` and includes `statusCode` and `status` properties.
- [ ] Create the `utils/catchAsync.js` wrapper function to handle errors in async controllers and pass them to `next()`.
- [ ] Implement the **Global Error Handling Middleware** in `app.js` (the one with 4 arguments: `err, req, res, next`).
    - It should handle different responses for `development` vs. `production` environments.
- [ ] Refactor all controller functions to use `catchAsync`.
- [ ] Replace manual error responses (e.g., for "not found") with `return next(new AppError('...', 404))`.

### 3.2. Build the `APIFeatures` Class
- [ ] Create `utils/apiFeatures.js`.
- [ ] The class constructor should accept a Mongoose query object and a query string (`req.query`).
- [ ] Implement the chainable methods:
    - `.filter()`: Handles basic and advanced filtering (e.g., `[gte]`).
    - `.sort()`: Handles sorting by one or more fields.
    - `.limitFields()`: Handles field projection (`select`).
    - `.paginate()`: Handles pagination (`skip` and `limit`).
- [ ] Refactor the `getAllPosts` controller to use this class.

---

## Phase 4: Authentication & Authorization

This phase adds a complete user management and security system.

### 4.1. Install Authentication Dependencies
- [ ] Install packages for security: `npm install jsonwebtoken bcryptjs`.

### 4.2. Create the User Model
- [ ] Create `models/userModel.js`.
- [ ] Define the `userSchema` with fields: `name`, `email`, `password`, `passwordConfirm`, and `role`.
- [ ] Use Mongoose validators: `required`, `unique`, `lowercase`, `minlength`, `enum`.
- [ ] Set `select: false` on the `password` field for security.
- [ ] Implement a **custom validator** for `passwordConfirm` to ensure it matches `password`.
- [ ] Use **Mongoose `.pre('save')` middleware** to:
    - Hash the password with `bcrypt.hash()` only if it has been modified.
    - Unset `passwordConfirm` by setting it to `undefined`.

### 4.3. Implement Authentication Logic
- [ ] Create `controllers/authController.js` and `routes/userRoutes.js`.
- [ ] In `authController`, create the `signup` function:
    - Create a new user with `User.create()`.
    - Generate a JWT with a `signToken` utility function.
    - Send the token and user data back (ensuring the password is not sent).
- [ ] Create the `login` function:
    - Find the user by email, making sure to `.select('+password')`.
    - Compare the incoming password with the stored hash using `bcrypt.compare()`.
    - If valid, generate and send a new JWT.

### 4.4. Implement Authorization (Route Protection)
- [ ] In `authController`, create the `protect` middleware:
    - Check for the JWT in the `Authorization` header.
    - Verify the token with `jwt.verify`.
    - Find the user from the token's payload to ensure they still exist.
    - Attach the user object to the request: `req.user = currentUser`.
- [ ] In `authController`, create the `restrictTo(...)` middleware for role-based access control.
- [ ] Apply the `protect` and `restrictTo` middleware to the appropriate routes in `postRoutes.js` and `userRoutes.js`.

---

## Phase 5: Production Readiness

This final phase adds essential security layers to prepare the API for deployment.

### 5.1. Install Final Security Dependencies
- [ ] Install packages for hardening: `npm install express-rate-limit helmet express-mongo-sanitize xss-clean`.

### 5.2. Configure Security Middleware in `app.js`
- [ ] Implement `helmet()` for secure headers.
- [ ] Implement `rateLimit()` to protect against brute-force attacks.
- [ ] Implement `mongoSanitize()` to prevent NoSQL query injection.
- [ ] Implement `xss()` to clean user input from malicious HTML.
- [ ] Implement a `body-parser` limit: `express.json({ limit: '10kb' })`.

### 5.3. Configure `package.json` Scripts
- [ ] Add a `dev` script for running with `nodemon`.
- [ ] Ensure the `start` script runs the application in `production` mode: `NODE_ENV=production node server.js`.