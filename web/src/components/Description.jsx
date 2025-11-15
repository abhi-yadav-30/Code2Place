import React from "react";
import { useSelector } from "react-redux";

const Description = ({ question }) => {
  if (!question) {
    return <div className="flex-1 p-5  text-white">Loading...</div>;
  }
  const language = useSelector((state) => state.utiles.language);

  return (
    <div className="flex-1 overflow-auto p-5 text-white leading-relaxed bg-[#262626]">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-3">{question.QueTitle}</h1>
      <div
        className={`
    inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3
    ${question.difficultyLevel === 1 ? "bg-green-600" : ""}
    ${question.difficultyLevel === 2 ? "bg-yellow-600" : ""}
    ${question.difficultyLevel === 3 ? "bg-red-600" : ""}
  `}
      >
        {question.difficultyLevel === 1 && "Easy"}
        {question.difficultyLevel === 2 && "Medium"}
        {question.difficultyLevel === 3 && "Hard"}
      </div>
      {/* Description */}
      <p className="whitespace-pre-line">{question.QueDescription}</p>

      {/* Input Format */}
      {Array.isArray(question?.inputFormat) &&
        question.inputFormat?.length != 0 && (
          <>
            <h2 className="mt-5 font-semibold text-lg">Input Format:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-300">
              {question.inputFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            {language.monaco == "java" && (
              <>
                <strong>Note for Java Users : </strong>
                Please make sure your main class is named{" "}
                <code className="text-yellow-200">Main</code>. Any other class
                name will cause a compilation error.
              </>
            )}
          </>
        )}

      {Array.isArray(question?.outputFormat) &&
        question.outputFormat?.length != 0 && (
          <>
            {/* Output Format */}
            <h2 className="mt-5 font-semibold text-lg">Output Format:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-300">
              {question.outputFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

      {Array.isArray(question?.constraints) &&
        question.constraints?.length != 0 && (
          <>
            {/* Constraints */}
            <h2 className="mt-5 font-semibold text-lg">Constraints:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-300">
              {question.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}

      {Array.isArray(question?.testCases) &&
        question.testCases?.length != 0 && (
          <>
            {/* Example Test Cases */}
            <h2 className="mt-5 font-semibold text-lg">Examples:</h2>
            {question.testCases
              .filter((tc) => !tc.isPrivate)
              .slice(0, 2)
              .map((test, idx) => (
                <pre
                  key={idx}
                  className="bg-gray-800 text-gray-200 p-3 rounded mt-3 text-sm whitespace-pre-wrap"
                >
                  {`Input:
${test.input}
Output:
${test.expected}`}
                </pre>
              ))}
          </>
        )}
    </div>
  );
};

export default Description;
