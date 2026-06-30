import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";
import fs from "fs";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// static hosting
app.use(express.static("."));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));

// replicate setup
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});


// ===================== IMAGE =====================
app.post("/image", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("IMAGE PROMPT:", prompt);

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: { prompt }
      }
    );

    const imageUrl = output[0];

    const img = await fetch(imageUrl);
    const buffer = Buffer.from(await img.arrayBuffer());

    if (!fs.existsSync("images")) fs.mkdirSync("images");

    const fileName = `img_${Date.now()}.png`;

    fs.writeFileSync(`images/${fileName}`, buffer);

    const result =
      `https://aivideoapp-wb8p.onrender.com/images/${fileName}`;

    console.log("IMAGE RESULT:", result);

    res.json({ result });

  } catch (e) {
    console.log("IMAGE ERROR:", e.message);
    res.status(500).json({ error: e.message });
  }
});


// ===================== VIDEO =====================
app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("VIDEO PROMPT:", prompt);

    const output = await replicate.run(
      "bytedance/seedance-1-lite",
      {
        input: { prompt }
      }
    );

    const videoUrl = output[0];

    const video = await fetch(videoUrl);
    const buffer = Buffer.from(await video.arrayBuffer());

    if (!fs.existsSync("videos")) fs.mkdirSync("videos");

    const fileName = `vid_${Date.now()}.mp4`;

    fs.writeFileSync(`videos/${fileName}`, buffer);

    const result =
      `https://aivideoapp-wb8p.onrender.com/videos/${fileName}`;

    console.log("VIDEO RESULT:", result);

    res.json({ result });

  } catch (e) {
    console.log("VIDEO ERROR:", e.message);
    res.status(500).json({ error: e.message });
  }
});


// ===================== START SERVER =====================
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
