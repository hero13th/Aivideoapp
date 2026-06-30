const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


// Serve index.html, style.css, script.js
app.use(express.static(__dirname));


// Home = actual app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// Image test
app.post("/image", (req, res) => {

  console.log("IMAGE REQUEST:", req.body);

  res.json({
    result: "https://via.placeholder.com/512"
  });

});


// Video test
app.post("/generate", (req, res) => {

  console.log("VIDEO REQUEST:", req.body);

  res.json({
    result: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  });

});


const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
