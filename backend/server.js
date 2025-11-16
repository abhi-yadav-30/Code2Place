import express from "express";
import axios from "axios";
import cors from "cors";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import questionRoutes from "./routes/questionRoutes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import { auth } from "./middlewares.js";
// import submissionRoutes from "./routes/submissionRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;
connectDB();
// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/question", auth, questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", auth, userRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/interview", interviewRoutes);

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
