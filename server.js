const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SERVER WORKING ✔");
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

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
