# Online Bookstore API

### BlueKyte AI Assignment 2 (RESTful API Development)

This is a RESTful API for an online bookstore. The API is built using Express.js for the backend, MongoDB for the database, and includes a simple front-end application using HTML, CSS, and JavaScript. The API supports various operations to manage the book inventory.

## Table of Contents

- Features
- Project Structure
- Installation
- Usage
- API Documentation
- Environment Variables
- Contributing
- License

## Features

1. User Authentication:

- Users can register with a unique username and a secure password.
- Passwords are hashed using bcrypt before being stored in the database.
- JWT tokens are generated upon successful registration and login.

2. Book Management:

- Authenticated users can add new book listings with details such as title, author, price, etc.
- CRUD operations for managing book listings (Create, Read, Update, Delete).

3. Middleware:

- `authenticateUser` middleware ensures that only authenticated users can access certain routes.

4. Error Handling:

- Centralized error handling middleware to handle 404 and 500 errors.

5. Health Check Endpoint:

- `/health` endpoint to check the status of the server and the database.

## Project Structure

- `index.js`: Main entry point for the application.

- `routes/`: Contains route definitions.

  - `authRoute.js`: Defines routes for user registration and login.
  - `bookRoute.js`: Defines routes for book-related operations.

- `controllers/`: Contains controller functions for handling requests.

  - `auth.js`: Controller functions for user registration and login.
  - `books.js`: Controller functions for book-related operations.

- `middleware/`: Contains middleware functions.

  - `auth.js`: Middleware for user authentication using JWT.

- `models/`: Defines Mongoose schemas for User and BookListing.

- `config/`: Contains configuration files.

- `README.md`: Documentation file.

## Installation

1. Clone the repository:

`git clone https://github.com/your-username/bookstore-api.git`

2. Navigate to the project directory:

`cd bookstore-api`

3. Install dependencies:

`npm install`

4. Create a .env file in the root directory and set your environment variables. You can use the provided .env.example as a template.

## Usage

1. Start the server:

`node server.js`

2. The server will be running at `http://localhost:your-port`.

3. Use API endpoints to register, login, and manage book listings.

## Front-end Application

- The front-end application is a simple HTML-based interface to interact with the API. Open the `https://blue-kyte-ai-assignment-2.vercel.app/` file in a web browser to access the application.

## API Documentation

### Retrieve Books

- `GET /books`: Get a list of all books.

### Add a New Book

- `POST /books`: Add a new book.
  - Request Body: `{ "title": "Book Title", "author": "Author Name", "publicationYear": 2022, "otherDetails": "Additional Information" }`

### Update Book Details

- PUT /books/:id: Update details of a specific book.

- Request Body: `{ "title": "Updated Title", "author": "Updated Author", "publicationYear": 2023, "otherDetails": "Updated Information" }`

### Delete a Book

DELETE /books/:id: Delete a specific book.

### Authentication

- POST /register: Register a new user.
  - Request Body: { "username": "your-username", "password": "your-password" }
- POST /login: Login with an existing user.
  - Request Body: { "username": "your-username", "password": "your-password" }

### Health Check

- GET /health: Check the status of the server and the database.

## Environment Variables

- `PORT`: Port on which the server will run.
- `DB_CONNECT`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT token generation.

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
