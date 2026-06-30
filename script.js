import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI SERVER RUNNING ✔");
});

app.post("/image", (req, res) => {
  res.json({
    result: "https://via.placeholder.com/512"
  });
});

app.post("/generate", (req, res) => {
  res.json({
    result: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});
