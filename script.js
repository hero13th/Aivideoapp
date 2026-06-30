const API = "https://aivideoapp-wb8p.onrender.com";


async function generateImage(){

const prompt = document.getElementById("prompt").value.trim();


if(!prompt){

alert("Enter prompt");
return;

}


console.log("Sending image:", prompt);


const response = await fetch(`${API}/image`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
prompt:prompt
})

});


const data = await response.json();


console.log(data);


if(data.result){

document.getElementById("image").src = data.result;

}else{

alert("No image returned");

}


}




async function generateVideo(){


const prompt = document.getElementById("prompt").value.trim();


if(!prompt){

alert("Enter prompt");
return;

}


console.log("Sending video:", prompt);



const response = await fetch(`${API}/generate`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
prompt:prompt
})

});



const data = await response.json();


console.log(data);



if(data.result){

document.getElementById("video").src = data.result;


}else{

alert("No video returned");

}


}
