const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


// Serve your app files
app.use(express.static(__dirname));


// Open app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Image test route
app.post("/image", (req, res) => {

  const prompt = req.body.prompt;

  console.log("IMAGE PROMPT:", prompt);

  res.json({
    result: "https://via.placeholder.com/512"
  });

});


// Video test route
app.post("/generate", (req, res) => {

  const prompt = req.body.prompt;

  console.log("VIDEO PROMPT:", prompt);

  res.json({
    result: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  });

});


const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
