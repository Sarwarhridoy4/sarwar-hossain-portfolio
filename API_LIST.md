# API List (Remote)

Base URL (remote): `https://sarwars-portfolio-server.vercel.app/api/v1`

**Endpoints**

| Category | Method | Endpoint | Access | Example |
|---|---|---|---|---|
| Auth | POST | `/auth/signup` | Public | [Signup](#example-auth-signup) |
| Auth | POST | `/auth/login` | Public | [Login](#example-auth-login) |
| Auth | POST | `/auth/refresh-token` | Public | [Refresh Token](#example-auth-refresh-token) |
| Auth | GET | `/auth/me` | Auth | [Me](#example-auth-me) |
| Auth | POST | `/auth/logout` | Auth | [Logout](#example-auth-logout) |
| Users | GET | `/users` | Admin | [Get Users](#example-users-get-all) |
| Users | GET | `/users/:id` | Admin | [Get User](#example-users-get-one) |
| Users | POST | `/users` | Admin | [Create User](#example-users-create) |
| Users | PUT | `/users/:id` | Admin | [Update User](#example-users-update) |
| Users | DELETE | `/users/:id` | Admin | [Delete User](#example-users-delete) |
| Blogs | GET | `/blogs` | Public | [Get Blogs](#example-blogs-get-all) |
| Blogs | GET | `/blogs/:id` | Public | [Get Blog](#example-blogs-get-one) |
| Blogs | GET | `/blogs/admin` | Admin | [Admin Blogs](#example-blogs-admin-all) |
| Blogs | GET | `/blogs/admin/:id` | Admin | [Admin Blog](#example-blogs-admin-one) |
| Blogs | POST | `/blogs` | Admin | [Create Blog](#example-blogs-create) |
| Blogs | PUT | `/blogs/:id` | Admin | [Update Blog](#example-blogs-update) |
| Blogs | DELETE | `/blogs/:id` | Admin | [Delete Blog](#example-blogs-delete) |
| Projects | GET | `/projects` | Public | [Get Projects](#example-projects-get-all) |
| Projects | GET | `/projects/:id` | Public | [Get Project](#example-projects-get-one) |
| Projects | GET | `/projects/admin` | Admin | [Admin Projects](#example-projects-admin-all) |
| Projects | GET | `/projects/admin/:id` | Admin | [Admin Project](#example-projects-admin-one) |
| Projects | POST | `/projects` | Admin | [Create Project](#example-projects-create) |
| Projects | PUT | `/projects/:id` | Admin | [Update Project](#example-projects-update) |
| Projects | DELETE | `/projects/:id` | Admin | [Delete Project](#example-projects-delete) |
| Resumes | GET | `/resumes` | Admin | [Get Resumes](#example-resumes-get-all) |
| Resumes | GET | `/resumes/public` | Public | [Get Public Resumes](#example-resumes-get-public) |
| Resumes | GET | `/resumes/public/:id` | Public | [Get Public Resume](#example-resumes-get-public-one) |
| Resumes | GET | `/resumes/user` | Auth | [Get User Resumes](#example-resumes-get-user) |
| Resumes | GET | `/resumes/:id` | Admin | [Get Resume](#example-resumes-get-one) |
| Resumes | POST | `/resumes` | Admin | [Create Resume](#example-resumes-create) |
| Resumes | PUT | `/resumes/:id` | Admin | [Update Resume](#example-resumes-update) |
| Resumes | DELETE | `/resumes/:id` | Admin | [Delete Resume](#example-resumes-delete) |
| Stats | GET | `/stats/general/overview` | Admin | [General Overview](#example-stats-general) |
| Stats | GET | `/stats/user` | Admin | [User Stats](#example-stats-user) |
| Stats | GET | `/stats/blog` | Admin | [Blog Stats](#example-stats-blog) |
| Stats | GET | `/stats/project` | Admin | [Project Stats](#example-stats-project) |
| Stats | GET | `/stats/traffic` | Admin | [Traffic Stats](#example-stats-traffic) |
| Stats | GET | `/stats/resume` | Admin | [Resume Stats](#example-stats-resume) |
| Health | GET | `/health` | Public | [Health](#example-health) |

**Examples**

**Auth**

<a id="example-auth-signup"></a>
Signup
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"123456"}'
```

<a id="example-auth-login"></a>
Login
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

<a id="example-auth-refresh-token"></a>
Refresh Token
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/auth/refresh-token" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
```

<a id="example-auth-me"></a>
Me
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/auth/me" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-auth-logout"></a>
Logout
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/auth/logout" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

**Users**

<a id="example-users-get-all"></a>
Get Users
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/users" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-users-get-one"></a>
Get User
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/users/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-users-create"></a>
Create User
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/users" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=123456" \
  -F "role=ADMIN" \
  -F "profilePicture=@/path/to/image.jpg"
```

<a id="example-users-update"></a>
Update User
```bash
curl -X PUT "https://sarwars-portfolio-server.vercel.app/api/v1/users/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "name=Updated Name" \
  -F "profilePicture=@/path/to/new_image.jpg"
```

<a id="example-users-delete"></a>
Delete User
```bash
curl -X DELETE "https://sarwars-portfolio-server.vercel.app/api/v1/users/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

**Blogs**

<a id="example-blogs-get-all"></a>
Get Blogs
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/blogs?q=typescript&page=1&limit=10"
```

<a id="example-blogs-get-one"></a>
Get Blog
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/blogs/uuid1"
```

<a id="example-blogs-admin-all"></a>
Admin Blogs
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/blogs/admin?includeDrafts=true" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-blogs-admin-one"></a>
Admin Blog
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/blogs/admin/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-blogs-create"></a>
Create Blog
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/blogs" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "title=My Blog" \
  -F "slug=my-blog" \
  -F "content=This is a detailed blog post content..." \
  -F "tags=tech" \
  -F "tags=backend" \
  -F "thumbnail=@/path/to/thumbnail.jpg"
```

<a id="example-blogs-update"></a>
Update Blog
```bash
curl -X PUT "https://sarwars-portfolio-server.vercel.app/api/v1/blogs/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "title=Updated Blog Title" \
  -F "thumbnail=@/path/to/new_thumbnail.jpg"
```

<a id="example-blogs-delete"></a>
Delete Blog
```bash
curl -X DELETE "https://sarwars-portfolio-server.vercel.app/api/v1/blogs/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

**Projects**

<a id="example-projects-get-all"></a>
Get Projects
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/projects?featured=true&limit=6"
```

<a id="example-projects-get-one"></a>
Get Project
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/projects/uuid1"
```

<a id="example-projects-admin-all"></a>
Admin Projects
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/projects/admin?includeDrafts=true" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-projects-admin-one"></a>
Admin Project
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/projects/admin/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-projects-create"></a>
Create Project
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/projects" \
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

<a id="example-projects-update"></a>
Update Project
```bash
curl -X PUT "https://sarwars-portfolio-server.vercel.app/api/v1/projects/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "title=Updated Project Title" \
  -F "images=@/path/to/new_image.jpg"
```

<a id="example-projects-delete"></a>
Delete Project
```bash
curl -X DELETE "https://sarwars-portfolio-server.vercel.app/api/v1/projects/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

**Resumes**

<a id="example-resumes-get-all"></a>
Get Resumes
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/resumes" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-resumes-get-public"></a>
Get Public Resumes
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/resumes/public"
```

<a id="example-resumes-get-public-one"></a>
Get Public Resume
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/resumes/public/uuid1"
```

<a id="example-resumes-get-user"></a>
Get User Resumes
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/resumes/user" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-resumes-get-one"></a>
Get Resume
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/resumes/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-resumes-create"></a>
Create Resume
```bash
curl -X POST "https://sarwars-portfolio-server.vercel.app/api/v1/resumes" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "title=Software Engineer Resume" \
  -F "summary=Experienced developer" \
  -F "skills=Node.js" \
  -F "skills=TypeScript" \
  -F "professionalPhoto=@/path/to/photo.jpg" \
  -F 'experiences=[{"role":"Developer","company":"xAI","duration":"2023-present"}]'
```

<a id="example-resumes-update"></a>
Update Resume
```bash
curl -X PUT "https://sarwars-portfolio-server.vercel.app/api/v1/resumes/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>" \
  -F "title=Updated Resume Title" \
  -F "professionalPhoto=@/path/to/new_photo.jpg"
```

<a id="example-resumes-delete"></a>
Delete Resume
```bash
curl -X DELETE "https://sarwars-portfolio-server.vercel.app/api/v1/resumes/uuid1" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

**Stats**

<a id="example-stats-general"></a>
General Overview
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/stats/general/overview" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-stats-user"></a>
User Stats
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/stats/user" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-stats-blog"></a>
Blog Stats
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/stats/blog" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-stats-project"></a>
Project Stats
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/stats/project" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-stats-traffic"></a>
Traffic Stats
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/stats/traffic" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

<a id="example-stats-resume"></a>
Resume Stats
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/stats/resume" \
  -H "Cookie: next-auth.session-token=<JWT_COOKIE>"
```

**Health**

<a id="example-health"></a>
Health
```bash
curl -X GET "https://sarwars-portfolio-server.vercel.app/api/v1/health"
```
