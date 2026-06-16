# Blogify Backend

A RESTful Blog Application built with Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, and Cookie-Based Authorization.

---

## Features Implemented

### Authentication

* User Signup
* User Login
* Password Hashing using bcrypt
* JWT Token Generation
* Cookie-Based Authentication
* Protected Routes using Authentication Middleware

### Blog Management

* Create Blog
* Get All Blogs
* Get Single Blog by ID

### Database Relationships

* User ↔ Blog Relationship using MongoDB ObjectId References
* Mongoose Population Support (Schema Ready)

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcrypt
* cookie-parser
* dotenv
* nodemon

---

## Project Structure

```text
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── user.js
│   └── blog.js
│
├── middlewares/
│   └── auth.js
│
├── models/
│   ├── user.js
│   └── blog.js
│
├── routes/
│   ├── user.js
│   └── blog.js
│
└── utils/

public/

index.js
.env
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd Blogify
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

---

## User Model

```js
{
  fullName,
  email,
  password,
  profileImage,
  role
}
```

### Constraints

* Email must be unique
* Password is stored in hashed form
* Role can be:

  * USER
  * ADMIN

---

## Blog Model

```js
{
  title,
  body,
  coverImageUrl,
  createdBy
}
```

### Relationship

```text
User
 ↓
Many Blogs
```

`createdBy` stores the User's ObjectId.

---

## Authentication Flow

### Signup

```text
User Registers
↓
Password Hashed using bcrypt
↓
User Saved in MongoDB
```

### Login

```text
User Login
↓
Credentials Verified
↓
JWT Generated
↓
Token Stored in HTTP Cookie
```

### Protected Routes

```text
Request
↓
Cookie Sent
↓
JWT Verified
↓
User Attached to req.user
↓
Controller Access Granted
```

---

## API Endpoints

### User Routes

#### Signup

```http
POST /user/signup
```

Request:

```json
{
  "fullName": "Arun Kumar",
  "email": "arun@gmail.com",
  "password": "123456"
}
```

---

#### Login

```http
POST /user/login
```

Request:

```json
{
  "email": "arun@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "User logged in"
}
```

JWT Token is stored in Cookie.

---

### Blog Routes

#### Create Blog

```http
POST /blog/create
```

Protected Route

Request:

```json
{
  "title": "Understanding JWT",
  "body": "JWT stands for JSON Web Token..."
}
```

---

#### Get All Blogs

```http
GET /blog
```

Protected Route

Returns all blogs created by the authenticated user.

---

#### Get Single Blog

```http
GET /blog/:id
```

Protected Route

Returns a specific blog by ID.

---

## Middleware

### Authentication Middleware

Responsibilities:

* Read JWT from Cookie
* Verify Token
* Check Expiration
* Attach User Data to `req.user`

Example:

```js
req.user = {
  id,
  email,
  role
}
```

---

## Password Security

Passwords are hashed using bcrypt.

Example:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

Passwords are never stored in plain text.

---

## Current Progress

### Completed

* [x] Project Setup
* [x] MongoDB Connection
* [x] User Model
* [x] Blog Model
* [x] Signup API
* [x] Login API
* [x] bcrypt Password Hashing
* [x] JWT Authentication
* [x] Cookie-Based Authentication
* [x] Authentication Middleware
* [x] Create Blog API
* [x] Get All Blogs API
* [x] Get Single Blog API

### Upcoming

* [ ] Update Blog API
* [ ] Delete Blog API
* [ ] Authorization Checks (Owner Only)
* [ ] Comments Feature
* [ ] Image Upload using Multer
* [ ] EJS Frontend
* [ ] Admin Features

```
```
