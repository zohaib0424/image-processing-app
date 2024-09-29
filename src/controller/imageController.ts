import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Image } from "../entities/image";
import { Comment } from "../entities/comment";
import { uploadToS3 } from "../services/s3Service";
import fs from "fs";

export const uploadImage = async (req: Request, res: Response) => {
  const { file } = req;

  console.log({ file });

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const s3Url = await uploadToS3(file.path, file.originalname);

    const imageRepo = AppDataSource.getRepository(Image);
    const newImage = new Image();
    newImage.filename = file.originalname;
    newImage.url = s3Url;

    await imageRepo.save(newImage);

    fs.unlinkSync(file.path);

    res.json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { imageId, text } = req.body;
  

  try {
    const imageRepo = AppDataSource.getRepository(Image);
    const image = await imageRepo.findOne({
      where: { id: imageId },
      relations: ["comments"],
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const commentRepo = AppDataSource.getRepository(Comment);
    const newComment = new Comment();
    newComment.text = text;
    newComment.image = image;

    await commentRepo.save(newComment);

    res.json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error });
  }
};
