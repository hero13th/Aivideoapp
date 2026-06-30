import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= HOME ================= */
app.get("/", (req, res) => {
  res.send("AI SERVER RUNNING ✔");
});

/* ================= REPLICATE ================= */
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

/* ================= IMAGE GENERATION ================= */
app.post("/image", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    console.log("IMAGE PROMPT:", prompt);

    if (!prompt) {
      return res.json({ error: "No prompt sent" });
    }

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: { prompt }
      }
    );

    console.log("IMAGE OUTPUT:", output);

    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      return res.json({ error: "No image returned" });
    }

    return res.json({
      result: imageUrl
    });

  } catch (err) {
    console.log("IMAGE ERROR:", err.message);

    return res.json({
      error: err.message
    });
  }
});

/* ================= VIDEO GENERATION ================= */
app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    console.log("VIDEO PROMPT:", prompt);

    if (!prompt) {
      return res.json({ error: "No prompt sent" });
    }

    const output = await replicate.run(
      "bytedance/seedance-1-lite",
      {
        input: { prompt }
      }
    );

    console.log("VIDEO OUTPUT:", output);

    const videoUrl = Array.isArray(output) ? output[0] : output;

    if (!videoUrl) {
      return res.json({ error: "No video returned" });
    }

    return res.json({
      result: videoUrl
    });

  } catch (err) {
    console.log("VIDEO ERROR:", err.message);

    return res.json({
      error: err.message
    });
  }
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
