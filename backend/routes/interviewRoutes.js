import express from "express";
import { getQuestion, getTranscribe } from "../controllers/interviewControllers.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });
router.post("/transcribe",upload.single("audio"), getTranscribe);
router.post("/ask", getQuestion);


export default router;


