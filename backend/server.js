// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors({ origin: true })); // permissive; tighten if needed
app.use(express.json());

// --- Mongo connection (serverless-safe singleton) ---
const { MONGO_URI, PORT = 5000 } = process.env;
if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI env var");
}

let cached = global.mongooseConn;
if (!cached) cached = global.mongooseConn = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        // Optional: tls/driver options here
      })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Ensure DB before routes
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (e) {
    console.error("DB connect error:", e?.message);
    res.status(500).json({ error: "DB connection failed" });
  }
});

// --- Models (avoid OverwriteModelError) ---
const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

// --- Routes ---
app.get("/", (req, res) => res.send("Server is running"));

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({}).lean();
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// --- Export for Vercel ---
export default app;

// Local dev only
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
