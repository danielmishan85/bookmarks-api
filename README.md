# Bookmark API

A REST API for saving and managing personal bookmarks, built with NestJS while learning the framework.

Users sign up and log in to get a JWT, then use it to create, view, edit and delete their own bookmarks.

## What I built

- **Authentication**: signup and login with email and password. Passwords are hashed with argon2, and login returns a JWT access token.
- **Protected routes**: a Passport JWT strategy and guard, plus a custom `@GetUser()` decorator that reads the logged-in user from the request.
- **Users**: get and update the current user's profile.
- **Bookmarks** (in progress): routes and DTOs for full CRUD, scoped to the logged-in user. The service logic and tests are still being written.
- **Validation**: request bodies are validated with DTOs and `class-validator`. Unknown fields are stripped.
- **Database**: PostgreSQL with Prisma for the schema, migrations and queries.
- **Testing**: end-to-end tests with Vitest and Pactum, run against a separate test database in Docker.

## Tech stack

| Area       | Tools                                 |
| ---------- | ------------------------------------- |
| Framework  | NestJS, TypeScript                    |
| Database   | PostgreSQL 15 (Docker), Prisma ORM    |
| Auth       | Passport, JWT (`@nestjs/jwt`), argon2 |
| Validation | class-validator, class-transformer    |
| Testing    | Vitest, Pactum                        |
| Tooling    | Docker Compose, oxlint, Prettier      |

## API endpoints

All endpoints except `/auth/*` need an `Authorization: Bearer <access_token>` header.

| Method | Route            | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/signup`   | Create an account, get a token |
| POST   | `/auth/login`    | Log in, get a token            |
| GET    | `/users/me`      | Get the current user           |
| PATCH  | `/users`         | Update the current user        |
| GET    | `/bookmarks`     | List your bookmarks            |
| GET    | `/bookmarks/:id` | Get one bookmark               |
| POST   | `/bookmarks`     | Create a bookmark              |
| PATCH  | `/bookmarks/:id` | Edit a bookmark                |
| DELETE | `/bookmarks/:id` | Delete a bookmark              |

Example bookmark body:

```json
{
  "title": "NestJS docs",
  "description": "Official documentation",
  "link": "https://docs.nestjs.com"
}
```

## Running the app

### Prerequisites

- Node.js 20 or later
- Docker Desktop

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
JWT_SECRET=your-secret-here
```

For the e2e tests, create a `.env.test` file with the same variables, using port `5433`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres?schema=public"
JWT_SECRET=your-secret-here
```

### 3. Start the database and run migrations

```bash
npm run db:dev:up
npm run prisma.dev:deploy
npx prisma generate
```

### 4. Start the server

```bash
npm run start:dev
```

The API runs at `http://localhost:3000`.

### Running the tests

```bash
npm run test:e2e
```

This starts a fresh test database on port 5433, applies the migrations and runs the end-to-end tests.

### Other useful commands

| Command                  | What it does                                           |
| ------------------------ | ------------------------------------------------------ |
| `npm run db:dev:restart` | Recreate the dev database container and run migrations |
| `npx prisma studio`      | Open a browser UI to view the database                 |
| `npm run lint`           | Lint the code                                          |
| `npm run format`         | Format the code with Prettier                          |
