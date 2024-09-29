import { Router } from "express";
import multer from "multer";
import { uploadImage, addComment } from "../controller/imageController";
import { Request, ParamsDictionary, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

const router = Router();
const upload = multer({ dest: "uploads/" });

// Error handling middleware for Multer
router.post(
  "/upload",
  (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
    next: () => void
  ) => {
    upload.single("image")(req, res, (err) => {
      console.log('body:', req.body);
      
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: "Server error" });
      }
      next();
    });
  },
  uploadImage as any
);
router.post("/comment", addComment as any);

export default router;
