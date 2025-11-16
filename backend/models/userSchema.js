import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],

    codeScore: { type: Number, default: 0 },

    resources: [
      {
        fileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "File",
        },
      },
    ],

    resourceSharingScore: { type: Number, default: 0 },

    uploadedQuestions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    ],
    interviewTranscriptions: [
      {
        createdAt: { type: Date, default: Date.now },
        transcription: [
          {
            question: { type: String },
            feedback: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
