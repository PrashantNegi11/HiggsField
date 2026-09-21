
// import * as fs from "node:fs";
import axios from "axios";
import express from "express";
import {prisma} from "../db";
import {z} from "zod";
import { CreateAvatarSchema, CreateUserSchema } from "../types";
import { createImage } from "../image";
import { createVideo } from "../video";
// import path from "node:path";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/v1/signup" , async (req,res) => {

    const {success,data} = CreateUserSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Incorrect Credentials"
        });
        return;
    }

    const user = await prisma.user.create( {
        data : {
            username : req.body.username,
            password : req.body.password
        }
    });
    res.json({
        id: user.id
    })
});

app.post("/api/v1/signin" ,  (req,res) => {

});

app.post("/api/v1/avatar", async (req, res) => {
    try {
        const image = await createImage(
            req.body.userPrompt
        );

        res.set("Content-Type", "image/png");
        res.send(image);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Image generation failed"
        });
    }
});
  
app.post("/api/v1/video", async (req, res) => {
    try {
      const video = await createVideo(
        req.body.prompt,
        req.body.imageUrl
      );
  
      res.json(video);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Video generation failed",
      });
    }
});

app.get("/api/v1/video/:videoId" , (req,res) => {

});

app.get("/api/v1/me" , (req,res) => {

});

app.get("/api/v1/models" , (req,res) => {

});

app.get("/api/v1/avatar/:avatarId" , (req,res) => {

});

app.get("/api/v1/avatars" , (req,res) => {

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})