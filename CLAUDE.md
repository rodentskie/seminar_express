# CLAUDE.md

## Project overview
Basic Todo REST API. Single-user, single-entity — no auth/multi-user scope for now.

## Tech stack
- Express 5 (ESM, `"type": "module"`)
- PostgreSQL via `pg` (Docker Compose service `pg`, db `seminar`, see [compose.yml](compose.yml))
- dotenv, cors, nodemon

## Structure
- [src/index.js](src/index.js) — entry point / server bootstrap (all routes currently live here)
- [src/schema/schema.prisma](src/schema/schema.prisma) — Prisma schema (models)
- [src/schema/migrations/](src/schema/migrations/) — Prisma migrations
- [prisma.config.mjs](prisma.config.mjs) — Prisma CLI config (schema/migrations paths, `DATABASE_URL`; Prisma 7 no longer reads the datasource URL from the schema file)
- [src/handler/](src/handler/) — request handlers (functions that handle the request and response), scaffolded, currently empty
- [src/middleware/](src/middleware/) — middleware, scaffolded, currently empty
- [src/routes/](src/routes/) — API routes, scaffolded, currently empty

## Data model

### Todo
The only entity in scope for this app.

| field       | type      | notes                          |
|-------------|-----------|---------------------------------|
| id          | serial    | primary key                    |
| title       | text      | required                       |
| description | text      | optional                       |
| completed   | boolean   | default `false`                |
| created_at  | timestamp | default `now()`                |
| updated_at  | timestamp | updated on change              |

Prisma schema (`src/schema/schema.prisma`):
```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("todos")
}
```

## Planned REST endpoints
- `GET /todos` — list all
- `GET /todos/:id` — get one
- `POST /todos` — create (`title` required, `description` optional)
- `PATCH /todos/:id` — update any subset of fields (commonly `completed`)
- `DELETE /todos/:id` — delete

## Explicit non-goals
- No auth/users/ownership on todos
- No categories, tags, due dates, or priority — keep the entity minimal unless requested


## Database

- Use Prisma ORM for all database operations
- Always use `prisma migrate dev` for schema changes (not `db push`)
- Run `prisma migrate status` before committing to verify migrations are in sync
- Production deployments must run `prisma migrate deploy` before the app starts