# Sarwar Hossain Portfolio Backend API

A robust backend API for managing a portfolio application, built with modern technologies to handle user authentication, blogs, projects, and resumes. This API powers a portfolio website with secure, role-based access and seamless integration with Cloudinary for file uploads.

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Endpoint Summary](#endpoint-summary)
  - [Auth API](#auth-api)
  - [Users API](#users-api)
  - [Blogs API](#blogs-api)
  - [Projects API](#projects-api)
  - [Resume API](#resume-api)
  - [Stats API](#stats-api)
  - [Health API](#health-api)
- [Response Format](#response-format)
- [Validation & Error Handling](#validation--error-handling)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Testing](#api-testing)
- [System Flowchart](#system-flowchart)
- [Notes](#notes)
- [License](#license)

## Overview

This project is the backend for Sarwar Hossain's portfolio, providing RESTful API endpoints to manage users, blogs, projects, and resumes. It uses NextAuth for authentication, Prisma 7 for database operations, and Cloudinary for file storage. The API enforces role-based access control, with `ADMIN` and `USER` roles, and supports file uploads for profile pictures, blog thumbnails, project images, and resume photos.

## Tech Stack

- **Bun**: Package manager/runtime for dev and scripts
- **Node.js**: JavaScript runtime for server-side development
- **Express**: Web framework for building RESTful APIs
- **TypeScript**: Static typing for enhanced code reliability
- **Prisma 7**: ORM for PostgreSQL database interactions
- **@prisma/adapter-pg**: PostgreSQL driver adapter for Prisma 7
- **PostgreSQL**: Relational database for data storage
- **NextAuth**: Authentication library for secure user sessions
- **Cloudinary**: Cloud-based file storage for images
- **Multer**: Middleware for handling file uploads

## Base URLs

- **Local**: `http://localhost:5000/api/v1`
- **Deployed**: `https://sarwar-portfolio-server-opal.vercel.app/api/v1`

## Authentication

All protected routes require a NextAuth session cookie. Include it in the request header as follows:

```
Cookie: next-auth.session-token=<JWT_COOKIE>
```

- **Roles**:
  - `ADMIN`: Full access to user management and CRUD operations for blogs, projects, and resumes.
  - `USER`: Limited access to their own resources (e.g., creating/updating their own resumes).

## API Endpoints

### Endpoint Summary

| Category | Access | Method | Endpoint |
|---|---|---|---|
| Auth | Public | `POST` | `/auth/signup` |
| Auth | Public | `POST` | `/auth/login` |
| Auth | Public | `POST` | `/auth/refresh-token` |
| Auth | Public | `POST` | `/auth/google` |
| Auth | Public | `POST` | `/auth/github` |
| Users | Admin | `GET` | `/users` |
| Users | Admin | `GET` | `/users/:id` |
| Users | Admin | `POST` | `/users` |
| Users | Admin | `PUT` | `/users/:id` |
| Users | Admin | `DELETE` | `/users/:id` |
| Blogs | Public | `GET` | `/blogs` |
| Blogs | Public | `GET` | `/blogs/:id` |
| Blogs | Admin | `GET` | `/blogs/admin` |
| Blogs | Admin | `GET` | `/blogs/admin/:id` |
| Blogs | Admin | `POST` | `/blogs` |
| Blogs | Admin | `PUT` | `/blogs/:id` |
| Blogs | Admin | `DELETE` | `/blogs/:id` |
| Projects | Public | `GET` | `/projects` |
| Projects | Public | `GET` | `/projects/:id` |
| Projects | Admin | `GET` | `/projects/admin` |
| Projects | Admin | `GET` | `/projects/admin/:id` |
| Projects | Admin | `POST` | `/projects` |
| Projects | Admin | `PUT` | `/projects/:id` |
| Projects | Admin | `DELETE` | `/projects/:id` |
| Resumes | Public | `GET` | `/resumes/public` |
| Resumes | Public | `GET` | `/resumes/public/:id` |
| Resumes | User | `GET` | `/resumes/user` |
| Resumes | Admin | `GET` | `/resumes` |
| Resumes | Admin | `GET` | `/resumes/:id` |
| Resumes | Admin | `POST` | `/resumes` |
| Resumes | Admin | `PUT` | `/resumes/:id` |
| Resumes | Admin | `DELETE` | `/resumes/:id` |
| Stats | Admin | `GET` | `/stats/general/overview` |
| Stats | Admin | `GET` | `/stats/user` |
| Stats | Admin | `GET` | `/stats/blog` |
| Stats | Admin | `GET` | `/stats/project` |
| Stats | Admin | `GET` | `/stats/traffic` |
| Stats | Admin | `GET` | `/stats/resume` |
| Health | Public | `GET` | `/health` |

**Auth**
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/google`
- `POST /auth/github`

**Users (Admin only)**
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

**Blogs**
- Public:
  - `GET /blogs`
  - `GET /blogs/:id`
- Admin:
  - `GET /blogs/admin`
  - `GET /blogs/admin/:id`
  - `POST /blogs`
  - `PUT /blogs/:id`
  - `DELETE /blogs/:id`

**Projects**
- Public:
  - `GET /projects`
  - `GET /projects/:id`
- Admin:
  - `GET /projects/admin`
  - `GET /projects/admin/:id`
  - `POST /projects`
  - `PUT /projects/:id`
  - `DELETE /projects/:id`

**Resumes**
- Public:
  - `GET /resumes/public`
  - `GET /resumes/public/:id`
- Admin:
  - `GET /resumes`
  - `GET /resumes/:id`
  - `POST /resumes`
  - `PUT /resumes/:id`
  - `DELETE /resumes/:id`
- User:
  - `GET /resumes/user`

**Stats (Admin only)**
- `GET /stats/general/overview`
- `GET /stats/user`
- `GET /stats/blog`
- `GET /stats/project`
- `GET /stats/traffic`
- `GET /stats/resume`

**Health**
- `GET /health`

### Auth API

Handles user signup and login. Authentication is managed via NextAuth, with JWT session tokens stored in cookies.

#### Signup

```
POST /auth/signup
```

- **Access**: Public
- **Description**: Creates a new user account.
- **Request Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User created successfully",
    "data": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "profilePicture": null,
      "provider": "CREDENTIAL",
      "createdAt": "2025-09-30T12:34:00Z",
      "updatedAt": "2025-09-30T12:34:00Z"
    }
  }
  ```

#### Login

```
POST /auth/login
```

- **Access**: Public
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body** (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "token": "your_jwt_token"
    }
  }
  ```

### Users API

Manages user accounts. All routes require `ADMIN` role.

#### User Model

```prisma
model User {
  id              String   @id @default(uuid())
  name            String
  email           String   @unique
  password        String
  role            Role     @default(USER)
  profilePicture  String?
  provider        String    @default("CREDENTIAL") // GOOGLE | GITHUB | CREDENTIAL
  resumes         Resume[]
  Project         Project[]
  Blog            Blog[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

#### SafeUser Type

```typescript
export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  profilePicture: string | null;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
};
```

#### Get All Users

```
GET /users
```

- **Access**: Admin
- **Description**: Retrieves a list of all users.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/users \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Users fetched successfully",
    "data": [
      {
        "id": "uuid1",
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "ADMIN",
        "profilePicture": "https://res.cloudinary.com/image.jpg",
        "provider": "CREDENTIAL",
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-01-01T00:00:00Z"
      }
    ]
  }
  ```

#### Get Single User

```
GET /users/:id
```

- **Access**: Admin
- **Description**: Retrieves a user by ID.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/users/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User fetched successfully",
    "data": {
      /* SafeUser object */
    }
  }
  ```

#### Create User

```
POST /users
```

- **Access**: Admin
- **Description**: Creates a new user with an optional profile picture.
- **Request Body** (multipart/form-data):
  | Field | Type | Required |
  |----------------|--------|----------|
  | name | string | Yes |
  | email | string | Yes |
  | password | string | Yes |
  | role | string | No |
  | profilePicture | file | No |
- **Example**:
  ```bash
  curl -X POST http://localhost:5000/api/v1/users \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "name=John Doe" \
    -F "email=john@example.com" \
    -F "password=123456" \
    -F "role=ADMIN" \
    -F "profilePicture=@/path/to/image.jpg"
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User created successfully",
    "data": {
      /* SafeUser object */
    }
  }
  ```

#### Update User

```
PUT /users/:id
```

- **Access**: Admin
- **Description**: Updates user details. Replaces profile picture if provided (old picture deleted from Cloudinary).
- **Request Body**: Same as Create User, all fields optional.
- **Example**:
  ```bash
  curl -X PUT http://localhost:5000/api/v1/users/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "name=Updated Name" \
    -F "profilePicture=@/path/to/new_image.jpg"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User updated successfully",
    "data": {
      /* Updated SafeUser object */
    }
  }
  ```

#### Delete User

```
DELETE /users/:id
```

- **Access**: Admin
- **Description**: Deletes a user and their associated resources.
- **Example**:
  ```bash
  curl -X DELETE http://localhost:5000/api/v1/users/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User deleted successfully",
    "data": null
  }
  ```

### Blogs API

Manages blog posts with thumbnail uploads.

#### Public Query Params

Use these optional query parameters on `GET /blogs` and `GET /blogs/:id`:

- `q`: Full-text search across title/content/slug.
- `tag`: Filter by a specific tag (case-insensitive).
- `featured`: `true` or `false` to filter featured blogs.
- `published`: `true` or `false` to filter by publish state.
- `page`: Page number (default `1`).
- `limit`: Page size (default `20`).
- `includeDrafts`: Admin-only; `true` or `false` (default `true` for admin routes).
- `includeDeleted`: Admin-only; `true` to include soft-deleted blogs.

**Examples**
- `GET /blogs?q=typescript&page=1&limit=10`
- `GET /blogs?tag=backend&featured=true`
- `GET /blogs?published=false` (admin only)

#### Blog Model

```prisma
model Blog {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  tags      String[] @default([])
  thumbnail String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  views     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  BlogView  BlogView[]
}

model BlogView {
  id     String   @id @default(uuid())
  blogId String
  blog   Blog     @relation(fields: [blogId], references: [id], onDelete: Cascade)
  count  Int      @default(1)
  date   DateTime @default(now())

  @@unique([blogId, date])
}
```

#### SafeBlog Type

```typescript
export type SafeBlog = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  thumbnail: string;
  content: string;
  authorId: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
};
```

#### Get All Blogs

```
GET /blogs
```

- **Access**: Public
- **Description**: Retrieves all blogs.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/blogs
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Blogs fetched successfully",
    "data": [
      /* Array of SafeBlog objects */
    ]
  }
  ```

#### Get Single Blog

```
GET /blogs/:id
```

- **Access**: Public
- **Description**: Retrieves a blog by ID.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/blogs/uuid1
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Blog fetched successfully",
    "data": {
      /* SafeBlog object */
    }
  }
  ```

#### Create Blog

```
POST /blogs
```

- **Access**: Auth (Admin only)
- **Description**: Creates a new blog with a thumbnail.
- **Request Body** (multipart/form-data):
  | Field | Type | Required |
  |-----------|----------|----------|
  | title | string | Yes |
  | slug | string | Yes |
  | content | string | Yes |
  | tags | string[] | No |
  | thumbnail | file | Yes |
- **Validation**: Title min 3 chars, content min 50 chars, tags array of strings.
- **Example**:
  ```bash
  curl -X POST http://localhost:5000/api/v1/blogs \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "title=My Blog" \
    -F "slug=my-blog" \
    -F "content=This is a detailed blog post content..." \
    -F "tags=tech" \
    -F "tags=backend" \
    -F "thumbnail=@/path/to/thumbnail.jpg"
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Blog created successfully",
    "data": {
      /* SafeBlog object */
    }
  }
  ```

#### Update Blog

```
PUT /blogs/:id
```

- **Access**: Auth (Admin only)
- **Description**: Updates a blog. Replaces thumbnail if provided (old deleted).
- **Request Body**: Same as Create Blog, all fields optional.
- **Example**:
  ```bash
  curl -X PUT http://localhost:5000/api/v1/blogs/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "title=Updated Blog Title" \
    -F "thumbnail=@/path/to/new_thumbnail.jpg"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Blog updated successfully",
    "data": {
      /* Updated SafeBlog object */
    }
  }
  ```

#### Delete Blog

```
DELETE /blogs/:id
```

- **Access**: Auth (Admin only)
- **Description**: Deletes a blog and its thumbnail.
- **Example**:
  ```bash
  curl -X DELETE http://localhost:5000/api/v1/blogs/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Blog deleted successfully",
    "data": null
  }
  ```

### Projects API

Manages projects with multiple image uploads.

#### Public Query Params

Use these optional query parameters on `GET /projects` and `GET /projects/:id`:

- `q`: Full-text search across title/description/slug/techStack.
- `featured`: `true` or `false` to filter featured projects.
- `published`: `true` or `false` to filter by publish state.
- `page`: Page number (default `1`).
- `limit`: Page size (default `20`).
- `includeDrafts`: Admin-only; `true` or `false` (default `true` for admin routes).
- `includeDeleted`: Admin-only; `true` to include soft-deleted projects.

**Examples**
- `GET /projects?q=portfolio`
- `GET /projects?featured=true&limit=6`
- `GET /projects?published=false` (admin only)

#### Project Model

```prisma
model Project {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  description String
  techStack   String[]
  images      String[]
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  videoUrl    String?
  liveUrl     String?
  repoUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### SafeProject Type

```typescript
export type SafeProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  images: string[];
  authorId: string;
  videoUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};
```

#### Get All Projects

```
GET /projects
```

- **Access**: Public
- **Description**: Retrieves published projects.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/projects \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Projects fetched successfully",
    "data": [
      /* Array of SafeProject objects */
    ]
  }
  ```

#### Get Single Project

```
GET /projects/:id
```

- **Access**: Public
- **Description**: Retrieves a published project by ID.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/projects/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Project fetched successfully",
    "data": {
      /* SafeProject object */
    }
  }
  ```

#### Create Project

```
POST /projects
```

- **Access**: Auth (Admin only)
- **Description**: Creates a new project with optional images.
- **Request Body** (multipart/form-data):
  | Field | Type | Required |
  |-------------|----------|----------|
  | title | string | Yes |
  | slug | string | Yes |
  | description | string | Yes |
  | techStack | string[] | No |
  | videoUrl | string | No |
  | liveUrl | string | No |
  | repoUrl | string | No |
  | images | file[] | No |
- **Example**:
  ```bash
  curl -X POST http://localhost:5000/api/v1/projects \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "title=My Project" \
    -F "slug=my-project" \
    -F "description=A portfolio project" \
    -F "techStack=Node.js" \
    -F "techStack=Prisma" \
    -F "liveUrl=https://example.com" \
    -F "repoUrl=https://github.com/example/repo" \
    -F "images=@/path/to/image1.jpg" \
    -F "images=@/path/to/image2.jpg"
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Project created successfully",
    "data": {
      /* SafeProject object */
    }
  }
  ```

#### Update Project

```
PUT /projects/:id
```

- **Access**: Auth (Admin only)
- **Description**: Updates a project. Replaces images if provided (old deleted).
- **Request Body**: Same as Create Project, all fields optional.
- **Example**:
  ```bash
  curl -X PUT http://localhost:5000/api/v1/projects/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "title=Updated Project Title" \
    -F "images=@/path/to/new_image.jpg"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Project updated successfully",
    "data": {
      /* Updated SafeProject object */
    }
  }
  ```

#### Delete Project

```
DELETE /projects/:id
```

- **Access**: Auth (Admin only)
- **Description**: Deletes a project and its images.
- **Example**:
  ```bash
  curl -X DELETE http://localhost:5000/api/v1/projects/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Project deleted successfully",
    "data": null
  }
  ```

### Resume API

Manages user resumes with flexible JSON fields and photo uploads.

#### Resume Model

```prisma
model Resume {
  id                String   @id @default(uuid())
  title             String
  summary           String?
  professionalPhoto String?
  experiences       Json?
  education         Json?
  skills            String[]
  projects          Json?
  certifications    Json?
  contactInfo       Json?
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

#### SafeResume Type

```typescript
export type SafeResume = {
  id: string;
  title: string;
  summary?: string;
  professionalPhoto?: string;
  experiences?: Record<string, any>[];
  education?: Record<string, any>[];
  skills: string[];
  projects?: Record<string, any>[];
  certifications?: Record<string, any>[];
  contactInfo?: Record<string, any>;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
```

#### Get All Resumes

```
GET /resumes
```

- **Access**: Auth (Admin only)
- **Description**: Retrieves all resumes.

#### Get Public Resumes

```
GET /resumes/public
```

- **Access**: Public
- **Description**: Retrieves only public resumes.

#### Get Public Resume

```
GET /resumes/public/:id
```

- **Access**: Public
- **Description**: Retrieves a public resume by ID.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/resumes \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Resumes fetched successfully",
    "data": [
      /* Array of SafeResume objects */
    ]
  }
  ```

#### Get Single Resume

```
GET /resumes/:id
```

- **Access**: Auth (Admin or owner)
- **Description**: Retrieves a resume by ID.
- **Example**:
  ```bash
  curl -X GET http://localhost:5000/api/v1/resumes/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Resume fetched successfully",
    "data": {
      /* SafeResume object */
    }
  }
  ```

#### Create Resume

```
POST /resumes
```

- **Access**: Auth (Admin or User)
- **Description**: Creates a new resume with optional photo and JSON fields.
- **Request Body** (multipart/form-data):
  | Field | Type | Required |
  |--------------------|------------|----------|
  | title | string | Yes |
  | summary | string | No |
  | skills | string[] | Yes |
  | professionalPhoto | file | No |
  | experiences | JSON string| No |
  | education | JSON string| No |
  | projects | JSON string| No |
  | certifications | JSON string| No |
  | contactInfo | JSON string| No |
- **Validation**: Title min 3 chars, skills array of strings, JSON fields must be valid, photo max 2MB.
- **Example**:
  ```bash
  curl -X POST http://localhost:5000/api/v1/resumes \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "title=Software Engineer Resume" \
    -F "summary=Experienced developer" \
    -F "skills=Node.js" \
    -F "skills=TypeScript" \
    -F "professionalPhoto=@/path/to/photo.jpg" \
    -F 'experiences=[{"role":"Developer","company":"xAI","duration":"2023-present"}]'
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Resume created successfully",
    "data": {
      /* SafeResume object */
    }
  }
  ```

#### Update Resume

```
PUT /resumes/:id
```

- **Access**: Auth (Admin or owner)
- **Description**: Updates a resume. Replaces photo if provided (old deleted).
- **Request Body**: Same as Create Resume, all fields optional.
- **Example**:
  ```bash
  curl -X PUT http://localhost:5000/api/v1/resumes/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
    -F "title=Updated Resume Title" \
    -F "professionalPhoto=@/path/to/new_photo.jpg"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Resume updated successfully",
    "data": {
      /* Updated SafeResume object */
    }
  }
  ```

#### Delete Resume

```
DELETE /resumes/:id
```

- **Access**: Auth (Admin only)
- **Description**: Deletes a resume and its photo.
- **Example**:
  ```bash
  curl -X DELETE http://localhost:5000/api/v1/resumes/uuid1 \
    -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Resume deleted successfully",
    "data": null
  }
  ```

## Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "statusCode": number,
  "message": string,
  "data": any
}
```

## Validation & Error Handling

- **Input Validation**: Handled at the service level to ensure data integrity.
- **Role-Based Access**: Enforced via `checkAuth` middleware.
- **File Restrictions**: Multer enforces file size (e.g., 2MB for images) and type restrictions.
- **Error Handling**: Global error handler formats errors for consistent responses.

## Setup & Installation

### Prerequisites

- Node.js ≥ 20
- PostgreSQL
- Cloudinary account (for file uploads)
- Optional: Postman or Insomnia for API testing

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Sarwarhridoy4/sarwar-hossain-portfolio.git
   cd sarwar-hossain-portfolio
   ```

2. **Install Dependencies**:

   ```bash
   bun install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` or `.env.local` file in the root directory with the following:

   ```env
   # App
   PORT=5000
   NODE_ENV=development

   # Auth / JWT
   JWT_ACCESS_SECRET="your_jwt_access_secret"
   JWT_ACCESS_EXPIRES="1d"
   JWT_REFRESH_SECRET="your_jwt_refresh_secret"
   JWT_REFRESH_EXPIRES="30d"
   NEXTAUTH_SECRET="your_nextauth_secret"
   BYCRYPT_SALT_ROUNDS=10

   # Database (PostgreSQL)
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/portfolio_db?schema=public"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

   # Admin seed (optional)
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your_admin_password"

   # Frontend
   FRONTEND_URL="http://localhost:3000"
   FRONTEND_URL_PRODUCTION="https://your-frontend-domain.com"
   ```

4. **Generate Prisma Client**:

   ```bash
   bun prisma generate
   ```

5. **Apply Database Migrations**:

   ```bash
   bun prisma migrate dev
   ```

6. **Seed Database** (Optional):
   ```bash
   bun run seed
   ```

## Running the Application

### Development

Run the development server with hot reloading:

```bash
bun run dev
```

- Server runs at: `http://localhost:5000`

### Production

Build and run the application for production:

```bash
# Build TypeScript code
bun run build

# Start production server
bun run start
```

- Builds to `/dist` folder
- Runs compiled JavaScript with Node.js

## API Testing

Use tools like Postman or Insomnia to test endpoints. Ensure the `Cookie` header includes the NextAuth session token for authenticated requests. Example requests are provided above for each endpoint.

## System Flowchart

```mermaid
flowchart TD
  Client[Portfolio Frontend] -->|Public GET| PublicAPI[Public API Routes]
  Admin[Admin Dashboard] -->|Auth + Cookies| AdminAPI[Admin API Routes]

  PublicAPI --> Blogs[Blogs]
  PublicAPI --> Projects[Projects]
  PublicAPI --> Resumes[Public Resumes]
  PublicAPI --> Health[Health Check]

  AdminAPI --> Auth[Auth]
  AdminAPI --> Users[Users]
  AdminAPI --> Blogs
  AdminAPI --> Projects
  AdminAPI --> Resumes
  AdminAPI --> Stats[Stats]

  Blogs --> Prisma[Prisma 7 ORM]
  Projects --> Prisma
  Resumes --> Prisma
  Users --> Prisma
  Stats --> Prisma
  Auth --> Prisma

  Prisma --> DB[(PostgreSQL)]
  Blogs --> Cloudinary[(Cloudinary)]
  Projects --> Cloudinary
  Resumes --> Cloudinary
```

## Notes

- **File Uploads**: Managed via Cloudinary, with automatic deletion of old files on update.
- **Security**: `checkAuth` middleware ensures private routes are secure.
- **Admin Privileges**: Only admins can manage users and delete certain resources.
- **Flexible Data**: Resume JSON fields (experiences, education, etc.) support arbitrary structures.
- **Prisma 7 Config**: Schema lives in `prisma/` (multi-file), and connection settings are defined in `prisma.config.ts` using `DATABASE_URL` from `.env` or `.env.local`.
- **Production Deployment**: Use a process manager like PM2 for production stability.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
