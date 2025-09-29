# 🖥 Sarwar Hossain Portfolio Backend API Documentation

**Stack:** Node.js, Express, TypeScript, Prisma, PostgreSQL, NextAuth, Cloudinary
**Base URL:**

```
http://localhost:5000/api/v1
```

---

## **Authentication (NextAuth)**

All protected routes require **NextAuth session cookie**:

**Header Example:**

```
Cookie: next-auth.session-token=<JWT_COOKIE>
```

- `ADMIN` role required for user management, project/blog/resume create/update/delete.
- `USER` can access only their own resources where applicable.

---

# **1️⃣ Auth**

### **Login (via NextAuth)**

Handled in frontend. Backend uses **JWT session from cookie** for protected routes.

---

# **2️⃣ Users API**

### **User Model**

```ts
model User {
  id              String   @id @default(uuid())
  name            String
  email           String   @unique
  password        String
  role            Role     @default(USER)
  profilePicture  String?
  provider        String    @default("CREDENTIAL") // GOOGLE | GITHUB | CREDENTIAL
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**SafeUser Type**

```ts
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

---

### **Get All Users**

```
GET /users
```

- Admin only
- Returns array of users

**Response Example:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully",
  "data": [...]
}
```

---

### **Get Single User**

```
GET /users/:id
```

- Admin only
- Returns a user by ID

---

### **Create User**

```
POST /users
```

- Admin only
- Body (multipart/form-data if profile picture):
  | Field | Type | Required |
  |-------|------|----------|
  | name | string | ✅ |
  | email | string | ✅ |
  | password | string | ✅ |
  | role | string (USER|ADMIN) | ❌ |
  | profilePicture | file | ❌ |

**Example cURL:**

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=123456" \
  -F "role=ADMIN" \
  -F "profilePicture=@/path/to/image.jpg"
```

---

### **Update User**

```
PUT /users/:id
```

- Admin only
- Fields optional; profilePicture can be replaced

**Old picture is automatically deleted from Cloudinary.**

---

### **Delete User**

```
DELETE /users/:id
```

- Admin only
- Deletes user and associated resources

---

# **3️⃣ Blogs API**

### **Blog Model**

```ts
model Blog {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  tag       String[]
  thumbnail String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**SafeBlog Type**

```ts
export type SafeBlog = {
  id: string;
  title: string;
  slug: string;
  tag: string[];
  thumbnail: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};
```

---

### **CRUD**

- `GET /blogs` – public
- `GET /blogs/:id` – public
- `POST /blogs` – Admin only (thumbnail upload)
- `PUT /blogs/:id` – Admin only (replace thumbnail if provided)
- `DELETE /blogs/:id` – Admin only

**Validation:** title min 3, content min 50, tags array of strings

---

# **4️⃣ Projects API**

### **Project Model**

```ts
model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  techStack   String[]
  images      String[]
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**SafeProject Type**

```ts
export type SafeProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};
```

---

### **CRUD**

- `GET /projects` – public
- `GET /projects/:id` – public
- `POST /projects` – Admin only (images upload; old images deleted automatically on update)
- `PUT /projects/:id` – Admin only
- `DELETE /projects/:id` – Admin only

---

# **5️⃣ Resume API**

### **Resume Model**

```ts
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

**SafeResume Type**

```ts
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

---

### **CRUD**

- `GET /resumes` – Admin only
- `GET /resumes/:id` – Admin only
- `POST /resumes` – Admin/User (file optional)
- `PUT /resumes/:id` – Admin/User (replace professional photo)
- `DELETE /resumes/:id` – Admin only

**Validation:**

- `title` required, min 3 chars
- `skills` required, array of strings
- JSON fields optional, must be valid JSON

**File Upload:**

- `professionalPhoto` max 2MB; old photo deleted automatically if replaced

---

# **Response Format**

```ts
{
  success: boolean,
  statusCode: number,
  message: string,
  data: any
}
```

---

# **Validation & Error Handling**

- All input validated at service level
- Role-based access enforced via `protectNextAuth` middleware
- File size/type restrictions applied via Multer
- Global error handler catches and formats errors

---

## **🚀 Quick Start & API Testing**

### **1. Prerequisites**

- Node.js ≥ 20
- PostgreSQL
- Optional: Postman / Insomnia for API testing

### **2. Install & Setup**

```bash
# Install dependencies
npm install

# Set up environment variables in .env file (see previous section)

# Generate Prisma client
npm run generate

# Apply database migrations
npm run migrate:dev

# Seed database with admin user (optional)
npm run seed
```

### **3. Run Development Server**

```bash
npm run dev
```

- Server will run at: `http://localhost:5000`

### **4. API Endpoints Overview**

**All endpoints require JWT authentication (except login/signup). Admin routes require `ADMIN` role.**

| Module   | Route           | Method | Description                           | Role       |
| -------- | --------------- | ------ | ------------------------------------- | ---------- |
| Auth     | `/auth/signup`  | POST   | Signup new user                       | Public     |
| Auth     | `/auth/login`   | POST   | Login with email/password             | Public     |
| Users    | `/users`        | GET    | Get all users                         | ADMIN      |
| Users    | `/users/:id`    | GET    | Get single user                       | ADMIN      |
| Users    | `/users`        | POST   | Create new user                       | ADMIN      |
| Users    | `/users/:id`    | PUT    | Update user                           | ADMIN      |
| Users    | `/users/:id`    | DELETE | Delete user                           | ADMIN      |
| Blogs    | `/blogs`        | GET    | Get all blogs                         | Public     |
| Blogs    | `/blogs/:id`    | GET    | Get single blog                       | Public     |
| Blogs    | `/blogs`        | POST   | Create blog (with optional thumbnail) | Auth       |
| Blogs    | `/blogs/:id`    | PUT    | Update blog (with optional thumbnail) | Auth       |
| Blogs    | `/blogs/:id`    | DELETE | Delete blog                           | Auth       |
| Projects | `/projects`     | GET    | Get all projects                      | Public     |
| Projects | `/projects/:id` | GET    | Get single project                    | Public     |
| Projects | `/projects`     | POST   | Create project (with images)          | Auth       |
| Projects | `/projects/:id` | PUT    | Update project (with images)          | Auth       |
| Projects | `/projects/:id` | DELETE | Delete project                        | Auth       |
| Resume   | `/resumes`      | GET    | Get all resumes                       | Auth/Admin |
| Resume   | `/resumes/:id`  | GET    | Get single resume                     | Auth/Admin |
| Resume   | `/resumes`      | POST   | Create resume (with optional photo)   | Auth       |
| Resume   | `/resumes/:id`  | PUT    | Update resume (with optional photo)   | Auth       |
| Resume   | `/resumes/:id`  | DELETE | Delete resume                         | Auth       |

---

### **5. Example Requests (Postman / cURL)**

#### **Signup**

```bash
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### **Login**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

- Response will return JWT token in JSON:

```json
{
  "success": true,
  "data": {
    "token": "your_jwt_token"
  }
}
```

#### **Authenticated Requests**

- Include token in `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

#### **Create Blog with Thumbnail (multipart/form-data)**

```
POST /blogs
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Fields:
- title: "My Blog"
- slug: "my-blog"
- content: "Blog content here..."
- tag: ["tech", "backend"]
- thumbnail: <file upload>
```

#### **Create Project with Images**

```
POST /projects
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Fields:
- title: "My Project"
- description: "Project description"
- techStack: ["Node.js", "Prisma", "Express"]
- images: <multiple file uploads>
```

#### **Create Resume with Professional Photo**

```
POST /resumes
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Fields:
- title: "Software Engineer Resume"
- summary: "Experienced backend developer..."
- skills: ["Node.js", "TypeScript", "Prisma"]
- professionalPhoto: <file upload>
- experiences: JSON string
- education: JSON string
- projects: JSON string
- certifications: JSON string
- contactInfo: JSON string
```

---

### **6. Notes**

- File uploads use Cloudinary.
- `protectNextAuth` middleware secures private routes.
- Only admins can manage users.
- Tags in blogs and techStack in projects are arrays of strings.
- Resume sections (experiences, education, projects, certifications, contactInfo) are flexible JSON objects.

---
