import User from "../models/userSchema.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("submissions")
      .populate("resources")
      .populate("uploadedQuestions");

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
