export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Sarwar Portfolio API",
    version: "1.0.0",
    description: "API documentation for Sarwar Hossain portfolio backend.",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Users" },
    { name: "Blogs" },
    { name: "Projects" },
    { name: "Resumes" },
    { name: "Stats" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },
    schemas: {
      ApiMessage: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["success", "message"],
      },
      ApiResponseUser: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/SafeUser" },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseUsers: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/SafeUser" },
          },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseBlog: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/SafeBlog" },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseBlogs: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/SafeBlog" },
          },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseProject: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/SafeProject" },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseProjects: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/SafeProject" },
          },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseResume: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/SafeResume" },
        },
        required: ["success", "message", "data"],
      },
      ApiResponseResumes: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/SafeResume" },
          },
        },
        required: ["success", "message", "data"],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: {
            oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
          },
        },
        required: ["success", "message"],
      },
      HealthOk: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          environment: { type: "string", example: "development" },
          timestamp: { type: "string", format: "date-time" },
        },
        required: ["status", "environment", "timestamp"],
      },
      HealthUnhealthy: {
        type: "object",
        properties: {
          status: { type: "string", example: "unhealthy" },
          environment: { type: "string", example: "development" },
          timestamp: { type: "string", format: "date-time" },
        },
        required: ["status", "environment", "timestamp"],
      },
      LoginResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string", enum: ["ADMIN", "USER"] },
              profilePicture: { type: "string", nullable: true },
              provider: { type: "string", example: "CREDENTIAL" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
            required: [
              "id",
              "name",
              "email",
              "role",
              "profilePicture",
              "provider",
              "createdAt",
              "updatedAt",
              "accessToken",
              "refreshToken",
            ],
          },
        },
        required: ["success", "message", "data"],
      },
      RefreshTokenResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              accessToken: { type: "string" },
              refreshToken: { type: "string" },
            },
            required: ["accessToken", "refreshToken"],
          },
        },
        required: ["success", "message", "data"],
      },
      SafeUser: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["ADMIN", "USER"] },
          profilePicture: { type: "string", nullable: true },
          provider: { type: "string", example: "CREDENTIAL" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "name",
          "email",
          "role",
          "profilePicture",
          "provider",
          "createdAt",
          "updatedAt",
        ],
      },
      SafeBlog: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          content: { type: "string" },
          thumbnail: { type: "string" },
          seoTitle: { type: "string", nullable: true },
          seoDescription: { type: "string", nullable: true },
          ogImage: { type: "string", nullable: true },
          featured: { type: "boolean" },
          priority: { type: "number", nullable: true },
          published: { type: "boolean" },
          publishedAt: { type: "string", format: "date-time", nullable: true },
          authorId: { type: "string" },
          views: { type: "number" },
          createdById: { type: "string", nullable: true },
          updatedById: { type: "string", nullable: true },
          deletedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "title",
          "slug",
          "tags",
          "content",
          "thumbnail",
          "featured",
          "published",
          "authorId",
          "views",
          "createdAt",
          "updatedAt",
        ],
      },
      SafeProject: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" },
          videoUrl: { type: "string", nullable: true },
          liveUrl: { type: "string", nullable: true },
          repoUrl: { type: "string", nullable: true },
          techStack: { type: "array", items: { type: "string" } },
          images: { type: "array", items: { type: "string" } },
          seoTitle: { type: "string", nullable: true },
          seoDescription: { type: "string", nullable: true },
          ogImage: { type: "string", nullable: true },
          featured: { type: "boolean" },
          priority: { type: "number", nullable: true },
          published: { type: "boolean" },
          publishedAt: { type: "string", format: "date-time", nullable: true },
          authorId: { type: "string" },
          createdById: { type: "string", nullable: true },
          updatedById: { type: "string", nullable: true },
          deletedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "title",
          "slug",
          "description",
          "techStack",
          "images",
          "featured",
          "published",
          "authorId",
          "createdAt",
          "updatedAt",
        ],
      },
      SafeResume: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          summary: { type: "string", nullable: true },
          professionalPhoto: { type: "string", nullable: true },
          isPublic: { type: "boolean" },
          experiences: {
            type: "array",
            items: { type: "object", additionalProperties: true },
            nullable: true,
          },
          education: {
            type: "array",
            items: { type: "object", additionalProperties: true },
            nullable: true,
          },
          skills: { type: "array", items: { type: "string" } },
          projects: {
            type: "array",
            items: { type: "object", additionalProperties: true },
            nullable: true,
          },
          certifications: {
            type: "array",
            items: { type: "object", additionalProperties: true },
            nullable: true,
          },
          contactInfo: { type: "object", additionalProperties: true, nullable: true },
          userId: { type: "string" },
          createdById: { type: "string", nullable: true },
          updatedById: { type: "string", nullable: true },
          deletedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "title",
          "summary",
          "professionalPhoto",
          "isPublic",
          "skills",
          "userId",
          "createdAt",
          "updatedAt",
        ],
      },
      StatsOverview: {
        type: "object",
        properties: {
          users: { type: "number" },
          blogs: { type: "number" },
          projects: { type: "number" },
          resumes: { type: "number" },
        },
        required: ["users", "blogs", "projects", "resumes"],
      },
      StatsUser: {
        type: "object",
        properties: {
          totalUsers: { type: "number" },
          totalAdmins: { type: "number" },
          newUsersLast7Days: { type: "number" },
          newUsersLast30Days: { type: "number" },
        },
        required: [
          "totalUsers",
          "totalAdmins",
          "newUsersLast7Days",
          "newUsersLast30Days",
        ],
      },
      StatsTraffic: {
        type: "object",
        properties: {
          totalViews: { type: "number" },
          avgDailyViews: { type: "number" },
          dailyViews: {
            type: "array",
            items: {
              type: "object",
              properties: {
                date: { type: "string", format: "date-time" },
                _sum: {
                  type: "object",
                  properties: {
                    count: { type: "number" },
                  },
                },
              },
            },
          },
        },
        required: ["totalViews", "avgDailyViews", "dailyViews"],
      },
      StatsBlog: {
        type: "object",
        properties: {
          totalBlogs: { type: "number" },
          totalViews: { type: "number" },
          last7Days: {
            type: "array",
            items: {
              type: "object",
              properties: {
                date: { type: "string", format: "date-time" },
                views: { type: "number" },
              },
              required: ["date", "views"],
            },
          },
          last30Days: {
            type: "array",
            items: {
              type: "object",
              properties: {
                date: { type: "string", format: "date-time" },
                views: { type: "number" },
              },
              required: ["date", "views"],
            },
          },
        },
        required: ["totalBlogs", "totalViews", "last7Days", "last30Days"],
      },
      StatsProject: {
        type: "object",
        properties: {
          totalProjects: { type: "number" },
          monthlyProjects: {
            type: "array",
            items: {
              type: "object",
              properties: {
                month: { type: "string" },
                count: { type: "number" },
              },
              required: ["month", "count"],
            },
          },
          topTechStacks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                tech: { type: "string" },
                count: { type: "number" },
              },
              required: ["tech", "count"],
            },
          },
          mostScreenshots: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                images: { type: "array", items: { type: "string" } },
              },
              required: ["id", "title", "images"],
            },
          },
        },
        required: ["totalProjects", "monthlyProjects", "topTechStacks", "mostScreenshots"],
      },
      StatsResume: {
        type: "object",
        properties: {
          totalResumes: { type: "number" },
          monthlyResumes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                month: { type: "string" },
                count: { type: "number" },
              },
              required: ["month", "count"],
            },
          },
          avgSkills: { type: "number" },
          topSkills: {
            type: "array",
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                count: { type: "number" },
              },
              required: ["skill", "count"],
            },
          },
        },
        required: ["totalResumes", "monthlyResumes", "avgSkills", "topSkills"],
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Root welcome message",
        responses: {
          "200": {
            description: "Welcome message",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                  required: ["message"],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthOk" },
              },
            },
          },
          "503": {
            description: "Service is unhealthy",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthUnhealthy" },
              },
            },
          },
        },
      },
    },
    "/api/v1/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Signup (create user without tokens)",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", minLength: 2 },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                  profilePicture: { type: "string", format: "binary" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseUser" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login with email and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          "401": { description: "Invalid credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/auth/refresh-token": {
      post: {
        tags: ["Auth"],
        summary: "Refresh access token",
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  refreshToken: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Access token refreshed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RefreshTokenResponse" },
              },
            },
          },
          "401": { description: "No refresh token or invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user profile",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "User profile fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseUser" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout and clear cookies",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Logged out",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiMessage" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Users fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseUsers" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create user (admin only)",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", minLength: 2 },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                  role: { type: "string", enum: ["ADMIN", "USER"] },
                  provider: { type: "string" },
                  profilePicture: { type: "string", format: "binary" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseUser" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user by id (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "User fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseUser" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update user (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                  role: { type: "string", enum: ["ADMIN", "USER"] },
                  provider: { type: "string" },
                  profilePicture: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseUser" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "User deleted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiMessage" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/blogs/admin": {
      get: {
        tags: ["Blogs"],
        summary: "Get all blogs (admin)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "tag", in: "query", schema: { type: "string" } },
          { name: "featured", in: "query", schema: { type: "boolean" } },
          { name: "published", in: "query", schema: { type: "boolean" } },
          { name: "includeDrafts", in: "query", schema: { type: "boolean" }, description: "Default true for admin" },
          { name: "includeDeleted", in: "query", schema: { type: "boolean" }, description: "Default false" },
          { name: "page", in: "query", schema: { type: "number" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "Blogs fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseBlogs" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/blogs/admin/{id}": {
      get: {
        tags: ["Blogs"],
        summary: "Get blog by id (admin)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "includeDrafts", in: "query", schema: { type: "boolean" }, description: "Default true for admin" },
          { name: "includeDeleted", in: "query", schema: { type: "boolean" }, description: "Default false" },
        ],
        responses: {
          "200": {
            description: "Blog fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseBlog" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/blogs": {
      get: {
        tags: ["Blogs"],
        summary: "Get all blogs (public)",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "tag", in: "query", schema: { type: "string" } },
          { name: "featured", in: "query", schema: { type: "boolean" } },
          { name: "published", in: "query", schema: { type: "boolean" } },
          { name: "page", in: "query", schema: { type: "number" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "Blogs fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseBlogs" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Blogs"],
        summary: "Create blog (admin only)",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", minLength: 3 },
                  slug: { type: "string" },
                  content: { type: "string", minLength: 10 },
                  tags: {
                    oneOf: [
                      { type: "string" },
                      { type: "array", items: { type: "string" } },
                    ],
                  },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  ogImage: { type: "string", format: "uri" },
                  featured: { type: "boolean" },
                  priority: { type: "number" },
                  published: { type: "boolean" },
                  thumbnail: { type: "string", format: "binary" },
                },
                required: ["title", "slug", "content"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Blog created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseBlog" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/blogs/{id}": {
      get: {
        tags: ["Blogs"],
        summary: "Get blog by id (public)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Blog fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseBlog" },
              },
            },
          },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      put: {
        tags: ["Blogs"],
        summary: "Update blog (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", minLength: 3 },
                  slug: { type: "string" },
                  content: { type: "string", minLength: 10 },
                  tags: {
                    oneOf: [
                      { type: "string" },
                      { type: "array", items: { type: "string" } },
                    ],
                  },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  ogImage: { type: "string", format: "uri" },
                  featured: { type: "boolean" },
                  priority: { type: "number" },
                  published: { type: "boolean" },
                  thumbnail: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Blog updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseBlog" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Blogs"],
        summary: "Delete blog (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Blog deleted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiMessage" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/projects/admin": {
      get: {
        tags: ["Projects"],
        summary: "Get all projects (admin)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "featured", in: "query", schema: { type: "boolean" } },
          { name: "published", in: "query", schema: { type: "boolean" } },
          { name: "includeDrafts", in: "query", schema: { type: "boolean" }, description: "Default true for admin" },
          { name: "includeDeleted", in: "query", schema: { type: "boolean" }, description: "Default false" },
          { name: "page", in: "query", schema: { type: "number" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "Projects fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseProjects" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/projects/admin/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Get project by id (admin)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "includeDrafts", in: "query", schema: { type: "boolean" }, description: "Default true for admin" },
          { name: "includeDeleted", in: "query", schema: { type: "boolean" }, description: "Default false" },
        ],
        responses: {
          "200": {
            description: "Project fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseProject" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/projects": {
      get: {
        tags: ["Projects"],
        summary: "Get all projects (public)",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "featured", in: "query", schema: { type: "boolean" } },
          { name: "published", in: "query", schema: { type: "boolean" } },
          { name: "page", in: "query", schema: { type: "number" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "Projects fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseProjects" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Projects"],
        summary: "Create project (admin only)",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", minLength: 3 },
                  slug: { type: "string" },
                  description: { type: "string", minLength: 3 },
                  techStack: {
                    oneOf: [
                      { type: "string" },
                      { type: "array", items: { type: "string" } },
                    ],
                  },
                  videoUrl: { type: "string", format: "uri" },
                  liveUrl: { type: "string", format: "uri" },
                  repoUrl: { type: "string", format: "uri" },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  ogImage: { type: "string", format: "uri" },
                  featured: { type: "boolean" },
                  priority: { type: "number" },
                  published: { type: "boolean" },
                  images: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                  },
                },
                required: ["title", "slug", "description"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Project created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseProject" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/projects/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Get project by id (public)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Project fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseProject" },
              },
            },
          },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      put: {
        tags: ["Projects"],
        summary: "Update project (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", minLength: 3 },
                  slug: { type: "string" },
                  description: { type: "string", minLength: 3 },
                  techStack: {
                    oneOf: [
                      { type: "string" },
                      { type: "array", items: { type: "string" } },
                    ],
                  },
                  videoUrl: { type: "string", format: "uri" },
                  liveUrl: { type: "string", format: "uri" },
                  repoUrl: { type: "string", format: "uri" },
                  seoTitle: { type: "string" },
                  seoDescription: { type: "string" },
                  ogImage: { type: "string", format: "uri" },
                  featured: { type: "boolean" },
                  priority: { type: "number" },
                  published: { type: "boolean" },
                  images: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Project updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseProject" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Projects"],
        summary: "Delete project (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Project deleted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiMessage" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/resumes": {
      get: {
        tags: ["Resumes"],
        summary: "Get all resumes (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Resumes fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResumes" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      post: {
        tags: ["Resumes"],
        summary: "Create resume (admin only)",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", minLength: 3 },
                  summary: { type: "string" },
                  experiences: { type: "string", description: "JSON string or object" },
                  education: { type: "string", description: "JSON string or object" },
                  skills: {
                    oneOf: [
                      { type: "string" },
                      { type: "array", items: { type: "string" } },
                    ],
                  },
                  projects: { type: "string", description: "JSON string or object" },
                  certifications: { type: "string", description: "JSON string or object" },
                  contactInfo: { type: "string", description: "JSON string or object" },
                  isPublic: { type: "boolean" },
                  professionalPhoto: { type: "string", format: "binary" },
                },
                required: ["title"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Resume created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResume" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/resumes/public": {
      get: {
        tags: ["Resumes"],
        summary: "Get public resumes",
        responses: {
          "200": {
            description: "Public resumes fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResumes" },
              },
            },
          },
        },
      },
    },
    "/api/v1/resumes/public/{id}": {
      get: {
        tags: ["Resumes"],
        summary: "Get public resume by id",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Public resume fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResume" },
              },
            },
          },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/resumes/user": {
      get: {
        tags: ["Resumes"],
        summary: "Get resumes for current user (admin/user)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "User resumes fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResumes" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/resumes/{id}": {
      get: {
        tags: ["Resumes"],
        summary: "Get resume by id (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Resume fetched",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResume" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      put: {
        tags: ["Resumes"],
        summary: "Update resume (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", minLength: 3 },
                  summary: { type: "string" },
                  experiences: { type: "string", description: "JSON string or object" },
                  education: { type: "string", description: "JSON string or object" },
                  skills: {
                    oneOf: [
                      { type: "string" },
                      { type: "array", items: { type: "string" } },
                    ],
                  },
                  projects: { type: "string", description: "JSON string or object" },
                  certifications: { type: "string", description: "JSON string or object" },
                  contactInfo: { type: "string", description: "JSON string or object" },
                  isPublic: { type: "boolean" },
                  professionalPhoto: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Resume updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponseResume" },
              },
            },
          },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      delete: {
        tags: ["Resumes"],
        summary: "Delete resume (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Resume deleted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiMessage" },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/stats/general/overview": {
      get: {
        tags: ["Stats"],
        summary: "Overview stats (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Overview stats fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/StatsOverview" },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/stats/user": {
      get: {
        tags: ["Stats"],
        summary: "User stats (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "User stats fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/StatsUser" },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/stats/traffic": {
      get: {
        tags: ["Stats"],
        summary: "Traffic stats (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Traffic stats fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/StatsTraffic" },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/stats/blog": {
      get: {
        tags: ["Stats"],
        summary: "Blog stats (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Blog stats fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/StatsBlog" },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/stats/project": {
      get: {
        tags: ["Stats"],
        summary: "Project stats (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Project stats fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/StatsProject" },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/api/v1/stats/resume": {
      get: {
        tags: ["Stats"],
        summary: "Resume stats (admin only)",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Resume stats fetched",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/StatsResume" },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
          "401": { description: "Invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "403": { description: "Forbidden", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
  },
} as const;
