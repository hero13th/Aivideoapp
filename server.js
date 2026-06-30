import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("AI Server is running ✔");
});

// ================= SAFE REPLICATE INIT =================
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ""
});

// ================= IMAGE =================
app.post("/image", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    console.log("IMAGE PROMPT:", prompt);

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: { prompt }
      }
    );

    console.log("IMAGE OUTPUT:", output);

    const imageUrl = Array.isArray(output) ? output[0] : output;

    return res.json({
      result: imageUrl
    });

  } catch (err) {
    console.log("IMAGE ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ================= VIDEO =================
app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    console.log("VIDEO PROMPT:", prompt);

    const output = await replicate.run(
      "bytedance/seedance-1-lite",
      {
        input: { prompt }
      }
    );

    console.log("VIDEO OUTPUT:", output);

    let videoUrl = Array.isArray(output)
      ? output[0]
      : typeof output === "string"
      ? output
      : null;

    if (!videoUrl) {
      return res.status(500).json({
        error: "No video URL returned"
      });
    }

    return res.json({
      result: videoUrl
    });

  } catch (err) {
    console.log("VIDEO ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
