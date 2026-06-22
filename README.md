# 📝 Blogify Backend

A production-ready RESTful backend for a blogging platform built using **Node.js**, **Express.js**, and **MongoDB**. It provides secure authentication, blog management, image uploads, comments, and soft delete functionality following the **MVC Architecture**.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Cookie-Based Authentication
- Protected Routes
- User Logout
- Password Hashing using bcrypt

---

### 📝 Blog Management
- Create Blog
- Get All Blogs
- Get My Blogs
- Get Single Blog
- Update Blog
- Soft Delete (Move to Trash)
- Restore Deleted Blog
- Permanent Delete
- Ownership Authorization

---

### 💬 Comment Management
- Add Comments
- Get Comments for a Blog
- Protected Comment Routes

---

### 🖼️ Image Upload
- Upload Cover Images
- Multer Disk Storage
- Custom File Names using NanoID
- Maximum File Size: **5 MB**
- Supports:
  - JPG
  - JPEG
  - PNG
  - WEBP
- Automatic Old Image Deletion
- Delete Image on Permanent Blog Deletion
- Default Cover Image Support

---

### 🛡️ Security
- JWT Authentication
- HTTP Only Cookies
- Password Hashing
- Protected Routes
- Ownership Validation
- File Type Validation
- File Size Validation

---

### ⚙️ Error Handling
- Global Multer Error Handling
- JSON Error Responses
- Proper HTTP Status Codes
- Graceful Error Handling

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- NanoID
- Cookie Parser
- dotenv

---

## 📂 Project Structure

```text
Blogify
│
├── public/
│   └── images/
│       └── defaultCover.png
│
├── uploads/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── user.js
│   │   ├── blog.js
│   │   └── comment.js
│   │
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── multer.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── user.js
│   │   ├── blog.js
│   │   └── comment.js
│   │
│   ├── utils/
│   │   └── file.js
│   │
│   └── services/
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Blogify.git
```

### Navigate to the Project

```bash
cd Blogify
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the Server

```bash
npm run dev
```

or

```bash
node index.js
```

The server will run at:

```
http://localhost:8000
```

---

# 📖 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/user/register` | Register a new user |
| POST | `/user/login` | Login user |
| POST | `/user/logout` | Logout user |

---

## Blog

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/blog/create` | Create Blog |
| GET | `/blog` | Get All Blogs |
| GET | `/blog/my-blogs` | Get Logged-in User Blogs |
| GET | `/blog/:id` | Get Single Blog |
| PATCH | `/blog/:id` | Update Blog |
| DELETE | `/blog/delete/:id` | Move Blog to Trash |
| PATCH | `/blog/restore/:id` | Restore Blog |
| DELETE | `/blog/permanentDelete/:id` | Permanently Delete Blog |
| GET | `/blog/deleted` | Get Deleted Blogs |

---

## Comments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/comment/:blogId` | Add Comment |
| GET | `/comment/:blogId` | Get Comments |

---

# 🖼️ Image Upload

### Storage

Images are stored inside

```
uploads/
```

Example

```
/uploads/Hg82KdLpQw.jpg
```

### Supported Formats

- JPG
- JPEG
- PNG
- WEBP

### Maximum Size

```
5 MB
```

---

# 🔄 Image Lifecycle

### Creating a Blog

```
Upload Image
      │
      ▼
Store in uploads/
      │
      ▼
Save Image Path in MongoDB
```

---

### Updating a Blog

```
Upload New Image
      │
      ▼
Update Database
      │
      ▼
Delete Old Image
```

---

### Permanently Deleting a Blog

```
Delete Uploaded Image
      │
      ▼
Delete Blog from Database
```

---

# 🛡️ Security Features

- JWT Authentication
- Cookie-Based Authentication
- Password Hashing using bcrypt
- Protected Routes
- Ownership Authorization
- File Validation
- Global Error Handling

---

# ⚠️ Error Responses

### Invalid File Type

```json
{
    "success": false,
    "message": "Only JPG, JPEG, PNG and WEBP image files are allowed."
}
```

---

### File Size Exceeded

```json
{
    "success": false,
    "message": "Image size should not exceed 5 MB."
}
```

---

### Unauthorized Access

```json
{
    "message": "Unauthorized"
}
```

---

### Blog Not Found

```json
{
    "message": "Blog not found"
}
```

---

# 📌 Upcoming Features

- Pagination
- Search
- Sorting
- Filtering
- Like / Unlike Blogs
- Bookmark Blogs
- User Profile
- Profile Picture Upload
- Change Password
- Forgot Password
- Email Verification
- Notifications
- Swagger Documentation
- Rate Limiting
- Redis Caching
- Docker Support
- Cloudinary Integration

---

# 👨‍💻 Author

**Arun Kumar**

B.Tech – Computer Science & Engineering (AI & ML)

Aspiring MERN Stack Developer

---

# 📄 License

This project is licensed under the MIT License.