# seminar_express

Basic Todo REST API built with Express and PostgreSQL (via Prisma).

## Docker

Build the image:

```bash
docker build -t seminar_express .
```

Run the container, pointing `--env-file` at your env file (must set `DATABASE_URL` and `PORT`):

```bash
docker run --env-file .env -p 8000:8000 seminar_express
```

## Migrations

Apply schema changes in development (creates a new migration if the schema changed, then applies it):

```bash
npm run migrate
```

Apply existing migrations without generating new ones — use in production/CI:

```bash
npm run migrate:deploy
```

Regenerate the Prisma Client from the schema (needed after pulling schema changes someone else made):

```bash
npm run prisma:generate
```
