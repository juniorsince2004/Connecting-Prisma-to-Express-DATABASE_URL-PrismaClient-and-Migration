# Connect Prisma to Express

A working Express + React app configured to connect **Prisma + PostgreSQL** at
server startup. The Threads API remains backed by the in-memory array in
`server/routes/threads.js`; this setup creates the database model and migration
without changing the API routes or React frontend.

## Prerequisites
- Node.js 18+
- A local **PostgreSQL** server running, and a database created (e.g. `createdb threadbase`)

## Setup
```bash
npm run setup     # installs root, server, and client deps

# client env (browser needs the API URL)
cp client/.env.development.example client/.env.development
```

## Setup (all server-side)
1. Copy `server/.env.example` to `server/.env` and set your real `DATABASE_URL`.
2. Create the PostgreSQL database referenced by `DATABASE_URL`.
3. Install dependencies with `npm run setup`.
4. From `server/`, run `npx prisma migrate dev --name init` to create the
   `Thread` table and apply the initial migration.
5. Start the app with `npm run dev`. Express connects to PostgreSQL before it
   starts listening.

## Run
```bash
npm run dev       # server on :3001, client on :5173
```

## Success looks like
- The server terminal prints **"Prisma connected"** before the API starts listening.
- The React app loads and the existing Threads API remains unchanged.
- `psql`: `SELECT * FROM "Thread";` can query the table created by the migration.

## Project layout
```
server/
  server.js            ← connects Prisma before starting Express
  routes/threads.js    ← in-memory API — unchanged
  prisma/              ← schema.prisma, migrations/, and PrismaClient singleton
  .env.example         ← DATABASE_URL template (copy to .env)
client/                ← complete React app — DO NOT change
```

> **Never commit `.env`.** It holds your database password. `.gitignore` already excludes it; commit `.env.example` only.
