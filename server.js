const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("AI SERVER RUNNING ✔");
});

// ================= IMAGE (TEST MODE) =================
app.post("/image", (req, res) => {
  const prompt = req.body.prompt;

  console.log("IMAGE PROMPT:", prompt);

  if (!prompt) {
    return res.json({ error: "No prompt sent" });
  }

  // TEST IMAGE (no AI yet, just proof system works)
  return res.json({
    result: "https://via.placeholder.com/512"
  });
});

// ================= VIDEO (TEST MODE) =================
app.post("/generate", (req, res) => {
  const prompt = req.body.prompt;

  console.log("VIDEO PROMPT:", prompt);

  if (!prompt) {
    return res.json({ error: "No prompt sent" });
  }

  // TEST VIDEO (no AI yet)
  return res.json({
    result: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
