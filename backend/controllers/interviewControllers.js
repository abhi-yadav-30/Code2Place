import Groq from "groq-sdk";

import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const interviewConfig = {
  role: "softerware Developer",
  round: "Technical interview",
  difficulty: "medium",
};




export const getTranscribe = async (req, res) => {
  try {
    console.log("🔥 /transcribe HIT");

    if (!req.file) {
        // console.log("helooo");
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    console.log("📄 File saved as:", req.file.filename);

    const file = fs.createReadStream(req.file.path);

    const result = await groq.audio.transcriptions.create({
      file,
      model: "whisper-large-v3",
    });
    console.log(result.text);
    res.json({ text: result.text });
  } catch (err) {
    console.error("❌ Transcribe error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    console.log("hiii.");
    const { answer } = req.body;
    // console.log(answer);

    // const completion = await groq.chat.completions.create({
    //   model: "llama-3.1-8b-instant",
    //   messages: [
    //     { role: "system", content: "You are an AI interview simulator." },
    //     { role: "user", content: `User answered: ${answer}` },
    //   ],
    // });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // FREE MODEL
      messages: [
        {
          role: "system",
          content: `
You are an AI Interview Simulator.

Your job:
1. Give short feedback (1–2 lines) ONLY about the user's previous answer. This feedback must mention:
   - positive point only if the answer was good or relevant.
   - One improvement point if needed.
2. Give detailed, in-depth feedback explaining how the user can improve overall.
3. Generate the next interview question.

Base everything on:
- Role: ${interviewConfig.role}
- Round: ${interviewConfig.round}
- Difficulty: ${interviewConfig.difficulty}

IMPORTANT RULES:
- You MUST return ONLY a valid JSON object.
- No explanations, no markdown, no text outside JSON.
- JSON format (STRICT):

{
  "nextQuestion": "string",
  "shortFeedback": "string",
  "detailedFeedback": "string"
}

If you cannot follow the instructions, return a JSON object with an "error" field.
`,
        },
        {
          role: "user",
          content: `The candidate answered: ${answer}. Evaluate and produce JSON.`,
        },
      ],
    });
    // console.log(completion.choices[0].message.content.);
    const resData = JSON.parse(completion.choices[0].message.content);

    // console.log(resData.detailedFeedback);
    res.json({
      nextQuestion: resData.nextQuestion,
      shortFeedback: resData.shortFeedback,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
