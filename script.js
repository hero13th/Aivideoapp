async function generateImage(){

const prompt = document.getElementById("prompt").value;

const result = document.getElementById("result");

result.innerHTML = "🖼 Creating image...";


const res = await fetch("/image",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

const data = await res.json();


result.innerHTML = `
<img src="${data.result}" width="100%">
<br><br>
<button onclick="openFile('${data.result}')">
⬇ Open / Download Image
</button>
`;

}





async function generateVideo(){

const prompt = document.getElementById("prompt").value;

const result = document.getElementById("result");

result.innerHTML = "🎬 Creating video...";


const res = await fetch("/generate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

const data = await res.json();


result.innerHTML = `
<video controls width="100%">
<source src="${data.result}" type="video/mp4">
</video>
<br><br>
<button onclick="openFile('${data.result}')">
⬇ Open / Download Video
</button>
`;

}





function openFile(url){

window.open(url, "_blank");

}