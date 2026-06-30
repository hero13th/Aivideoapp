const API = "https://aivideoapp-wb8p.onrender.com";

console.log("SCRIPT LOADED");

// ================= IMAGE =================
async function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Enter a prompt");
    return;
  }

  document.getElementById("status").innerText = "Generating image...";

  try {
    const res = await fetch(`${API}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    console.log("IMAGE RESPONSE:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("image").src = data.result;

    document.getElementById("status").innerText = "Image ready ✔";

  } catch (err) {
    console.log(err);
    alert("Image request failed");
  }
}

// ================= VIDEO =================
async function generateVideo() {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Enter a prompt");
    return;
  }

  document.getElementById("status").innerText = "Generating video...";

  try {
    const res = await fetch(`${API}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    console.log("VIDEO RESPONSE:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("video").src = data.result;

    document.getElementById("status").innerText = "Video ready ✔";

  } catch (err) {
    console.log(err);
    alert("Video request failed");
  }
}
