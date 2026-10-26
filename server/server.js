// ─────────────────────────────────────────────────────────────
// Express entry point.
//
// Right now this server works, but its data lives in an in-memory array
// (see routes/threads.js) and vanishes on every restart.
//
// Connect Prisma before accepting requests. The routes and client stay unchanged.
// ─────────────────────────────────────────────────────────────
import "dotenv/config"; // loads DATABASE_URL from .env before anything reads process.env
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

const PORT = 3001;

async function startServer() {
  await prisma.$connect();
  console.log("✅ Prisma connected");

  app.listen(PORT, () => {
    console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to connect to Prisma. Check DATABASE_URL.", error);
  process.exitCode = 1;
});
