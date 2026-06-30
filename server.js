ķimport express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// HOME TEST
app.get("/", (req, res) => {
  res.send("SERVER OK ✔");
});

// IMAGE TEST (NO AI YET)
app.post("/image", (req, res) => {
  res.json({
    result: "https://via.placeholder.com/512"
  });
});

// VIDEO TEST
app.post("/generate", (req, res) => {
  res.json({
    result: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
