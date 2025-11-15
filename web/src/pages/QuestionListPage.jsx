import { useEffect, useState } from "react";

export default function QuestionsListPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/question/questions",
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const questions = await res.json();
        setQuestions(questions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  const getDifficultyBadge = (level) => {
    if (level === 1)
      return (
        <span className="px-2 py-1 rounded-full bg-green-600 text-xs">
          Easy
        </span>
      );
    if (level === 2)
      return (
        <span className="px-2 py-1 rounded-full bg-yellow-600 text-xs">
          Medium
        </span>
      );
    return (
      <span className="px-2 py-1 rounded-full bg-red-600 text-xs">Hard</span>
    );
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-[#2b2b2b] text-white p-6 overflow-y-scroll">
      <h1 className="text-2xl font-semibold mb-5">All Questions</h1>

      <div className="space-y-4">
        {questions.map((q) => (
          <a
            href={`/questions/${q._id}`}
            key={q._id}
            className="block  bg-[#212121d8] p-4 rounded-lg border border-gray-700 hover:bg-[#171717] transition hover:text-blue-400"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium ">{q.QueTitle}</h2>
              <span className="text-white">
                {getDifficultyBadge(q.difficultyLevel)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
