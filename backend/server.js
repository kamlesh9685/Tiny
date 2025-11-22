import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === MongoDB Connection ===
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI is missing in .env file");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// === Schema ===
const linkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  last_clicked: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
});

const Link = mongoose.model("Link", linkSchema);

// === Healthcheck ===
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// === Create Link ===
app.post("/api/links", async (req, res) => {
  const { url, code } = req.body;

  if (!url) return res.status(400).json({ error: "URL required" });

  // Modern + Correct URL validation
  try {
    new URL(url);
  } catch (_) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // Flexible 3–15 alphanumeric codes
  if (!code || !/^[A-Za-z0-9]{3,15}$/.test(code)) {
    return res.status(400).json({ error: "Code must be 3–15 letters/numbers" });
  }

  try {
    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const link = new Link({ code, url });
    await link.save();

    return res.json(link);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// === List All Links ===
app.get("/api/links", async (req, res) => {
  const links = await Link.find().sort({ created_at: -1 });
  res.json(links);
});

// === Stats for One Code ===
app.get("/api/links/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
});

// === Delete ===
app.delete("/api/links/:code", async (req, res) => {
  const result = await Link.deleteOne({ code: req.params.code });
  if (result.deletedCount === 0)
    return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

// === Redirect ===
app.get("/:code", async (req, res) => {
  const code = req.params.code;

  // Block internal routes
  if (["api", "healthz", "code"].includes(code))
    return res.status(404).send("Not Found");

  const link = await Link.findOne({ code });
  if (!link) return res.status(404).send("Not Found");

  link.clicks++;
  link.last_clicked = new Date();
  await link.save();

  return res.redirect(link.url);
});

// === Serve Frontend (Production build) ===
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
