const API = "https://aivideoapp-wb8p.onrender.com";

// ================= IMAGE =================
async function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Enter prompt");
    return;
  }

  alert("Sending image: " + prompt);
  console.log("IMAGE PROMPT:", prompt);

  try {
    const res = await fetch(`${API}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    console.log("IMAGE REQUEST SENT");

    const data = await res.json();

    alert("IMAGE RESPONSE: " + JSON.stringify(data));

    const img = document.getElementById("image");
    const video = document.getElementById("video");

    video.style.display = "none";
    img.style.display = "block";

    img.src = data.result;

  } catch (err) {
    alert("IMAGE ERROR: " + err.message);
    console.log(err);
  }
}


// ================= VIDEO =================
async function generateVideo() {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Enter prompt");
    return;
  }

  alert("Sending video: " + prompt);
  console.log("VIDEO PROMPT:", prompt);

  try {
    const res = await fetch(`${API}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    console.log("VIDEO REQUEST SENT");

    const data = await res.json();

    alert("VIDEO RESPONSE: " + JSON.stringify(data));

    const img = document.getElementById("image");
    const video = document.getElementById("video");

    img.style.display = "none";
    video.style.display = "block";

    video.src = data.result;

  } catch (err) {
    alert("VIDEO ERROR: " + err.message);
    console.log(err);
  }
}
