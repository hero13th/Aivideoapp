import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";
import fs from "fs";


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


app.use(express.static("."));
app.use("/videos", express.static("videos"));
app.use("/images", express.static("images"));



const replicate = new Replicate({

auth: process.env.REPLICATE_API_TOKEN

});





// VIDEO

app.post("/generate", async (req,res)=>{

try{


const prompt = req.body.prompt;


console.log("Video prompt:", prompt);

console.log("Sending video to Replicate...");



const output = await replicate.run(

"bytedance/seedance-1-lite",

{

input:{

prompt:prompt

}

}

);



const videoUrl = output.url().href;


console.log("Downloading video...");



const videoData = await fetch(videoUrl);

const videoBuffer = Buffer.from(

await videoData.arrayBuffer()

);



if(!fs.existsSync("videos")){

fs.mkdirSync("videos");

}


fs.writeFileSync(

"videos/video.mp4",

videoBuffer

);



const result =

"https://thehun-adjusted-political-thumb.trycloudflare.com/videos/video.mp4";



console.log("VIDEO:", result);



res.json({

result:result

});



}

catch(error){


console.log("VIDEO ERROR:", error.message);


res.status(500).json({

error:error.message

});


}


});







// IMAGE

app.post("/image", async (req,res)=>{

try{


const prompt = req.body.prompt;


console.log("Image prompt:", prompt);

console.log("Sending image to Replicate...");



const output = await replicate.run(

"black-forest-labs/flux-schnell",

{

input:{

prompt:prompt

}

}

);



const imageUrl = output[0];


console.log("Downloading image...");



const imageData = await fetch(imageUrl);


const imageBuffer = Buffer.from(

await imageData.arrayBuffer()

);



if(!fs.existsSync("images")){

fs.mkdirSync("images");

}



fs.writeFileSync(

"images/image.png",

imageBuffer

);



const result =

"https://thehun-adjusted-political-thumb.trycloudflare.com/images/image.png";



console.log("IMAGE:", result);



res.json({

result:result

});



}

catch(error){


console.log("IMAGE ERROR:", error.message);


res.status(500).json({

error:error.message

});


}


});





app.listen(3000,"0.0.0.0",()=>{


console.log("Server running on port 3000");


});
