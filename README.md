# Node.js Blog API - A 10-Day Learning Journey

This repository documents the creation of a comprehensive REST API for a blog, built from scratch over an intensive 10-day sprint. The project serves as a practical, hands-on guide to modern backend development using the Node.js ecosystem, covering everything from basic server setup to advanced features like authentication and security best practices.

---

## Core Concepts & Architecture

This project is built on a set of modern, professional architectural patterns:

* **RESTful API Design:** Designing and building logical, resource-oriented endpoints following REST principles (e.g., `GET /posts`, `POST /posts`, `PATCH /posts/:id`).

* **MVC (Model-Controller) Architecture:** Structuring the application by separating concerns:
    * **Models:** Define the data structure and interact with the database (Mongoose Schemas).
    * **Controllers:** Contain the business logic for handling requests and generating responses.
    * **(Views):** In the context of this REST API, the "views" are the JSON responses consumed by a client (like a frontend framework or a mobile app).

* **Asynchronous JavaScript:** Deep utilization of `async/await` for clean, readable, and non-blocking code, especially for database interactions.

* **Centralized Error Handling:** Implementation of a robust error handling strategy with a global middleware and an async wrapper function (`catchAsync`) to keep controllers clean and DRY (Don't Repeat Yourself).

* **Stateless JWT Authentication:** A secure and scalable authentication flow using JSON Web Tokens (JWT). The server remains stateless, verifying users based on a token they provide with each request.

---

## Technologies Used

* **Node.js:** The core runtime environment.
* **Express.js:** Web framework for building the API, managing routes, and handling middleware.
* **MongoDB:** NoSQL database for storing application data.
* **Mongoose:** Object Data Modeling (ODM) library for elegant interaction with MongoDB.
* **jsonwebtoken (JWT):** For generating and verifying authentication tokens.
* **bcryptjs:** For securely hashing user passwords.
* **dotenv:** For managing environment variables and secrets.
* **Helmet, express-rate-limit, express-mongo-sanitize, xss-clean:** For implementing security best practices.

---

## Learning Journey (Day by Day)

### Day 1: The Foundation
* Setting up a Node.js project (`npm init`).
* Creating a basic Express server (`app.js`).
* Listening for requests and sending back a simple JSON response.

### Day 2: Structuring the App
* Understanding the importance of Separation of Concerns.
* Implementing the MVC pattern by creating `routes` and `controllers` directories.
* Creating the first router with `express.Router()`.

### Day 3: Full CRUD with In-Memory Data
* Implementing all CRUD (Create, Read, Update, Delete) operations.
* Handling different HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`).
* Using an in-memory array to simulate a database.

### Day 4: Database Connection
* Setting up a cloud database with MongoDB Atlas.
* Installing Mongoose and `dotenv`.
* Connecting the application to the remote database.
* Creating a Mongoose Schema and Model for posts.

### Day 5: Migrating to a Real Database
* Refactoring all CRUD operations to be `async` functions.
* Replacing in-memory array logic with Mongoose methods (`find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`).

### Day 6: Professional Error Handling
* Creating an async wrapper function (`catchAsync`) to eliminate `try/catch` blocks in controllers.
* Implementing a global error handling middleware to centralize all error responses.
* Creating a custom `AppError` class for handling operational errors (e.g., 404 Not Found).

### Day 7: Advanced API Features
* Refactoring the `getAllPosts` endpoint to be highly flexible.
* Implementing server-side **filtering, sorting, field limiting (projection),** and **pagination** based on query parameters.
* Building a reusable `APIFeatures` class to encapsulate this logic.

### Day 8: Authentication
* Creating a User model with password hashing using `bcryptjs`.
* Implementing user **registration (sign up)** and **login** endpoints.
* Generating a **JWT** upon successful login to identify users.

### Day 9: Authorization & Security
* Creating a `protect` middleware to secure routes, allowing access only to logged-in users.
* Implementing **role-based authorization** (e.g., restricting certain actions to `admin` users).
* Adding essential security layers: rate limiting, setting security headers with Helmet, and sanitizing input data.

### Day 10: Final Touches & Deployment Prep
* Refactoring and code cleanup.
* Improving the error handler for development vs. production environments.
* Understanding the concepts and steps required for deployment on platforms like Render or Heroku.

---

## Setup & Installation

1.  Clone the repository:
    ```sh
    git clone [path to git]
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `config.env` file in the root directory and add your environment variables:
    ```
    PORT=3000
    DATABASE_URL=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret>
    ```
4.  Start the server:
    ```sh
    npm start
    ```