import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Console = () => {
  const testcases = useSelector((state) => state.utiles.testCases);
  // console.log(testcases);
  const isRunning = useSelector((state) => state.utiles.isRunning);
  const isSubmitting = useSelector((state) => state.utiles.isSubmitting);
  // console.log(isRunning);
  const [isLoading, setIsLoading] = useState(
    isRunning || isSubmitting || false
  );
  useEffect(() => {
    setIsLoading(isRunning || isSubmitting);
  }, [isRunning, isSubmitting]);

  return (
    <div className="h-60 border-t border-gray-700 bg-[#1e1e1e] text-gray-200 font-mono text-sm p-3 overflow-auto">
      <h2 className="text-lg font-semibold mb-3 text-white">Console</h2>

      {!isLoading && testcases.length === 0 && (
        <p className="text-gray-400">Run code to see test case results...</p>
      )}

      {!isLoading ? (
        <div className="space-y-4">
          {testcases.map((tc, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-700 bg-[#252526]"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-blue-400">
                  Test Case {index + 1} {tc.isPrivate && "(Private Test Case)"}
                </h3>

                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    tc.passed
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {tc.passed ? "Passed" : "Failed"}
                </span>
              </div>

              {/* PRIVATE TEST – hide I/O */}
              {tc.isPrivate ? (
                <div className="text-yellow-400 italic">
                  This is a private test case. Input/Output hidden.
                </div>
              ) : (
                <>
                  {/* CASE 1: Show error (Compile / Runtime / Judge error) */}
                  {tc.error ? (
                    <div className="text-red-400 bg-red-900/30 p-3 rounded mt-2">
                      <p className="font-semibold">Error:</p>
                      <pre className="whitespace-pre-wrap text-sm">
                        {tc.error}
                      </pre>
                      <p className="mt-1 text-gray-400 text-xs">
                        Status: {tc.status}
                      </p>
                    </div>
                  ) : (
                    /* CASE 2: Normal I/O output */
                    <div className="text-gray-300">
                      <p>
                        <span className="text-gray-400">Input:</span>{" "}
                        {JSON.stringify(tc.input)}
                      </p>
                      <p>
                        <span className="text-gray-400">Output:</span>{" "}
                        {JSON.stringify(tc.actual)}
                      </p>
                      <p>
                        <span className="text-gray-400">Expected:</span>{" "}
                        {JSON.stringify(tc.expected)}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-gray-400">Judge is evaluating your code...</p>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-700 bg-[#252526] animate-pulse my-3"
            >
              <div className="flex justify-between items-center mb-2">
                {/* Title skeleton */}
                <div className="h-4 w-32 bg-gray-600 rounded"></div>

                {/* Status badge skeleton */}
                <div className="h-4 w-14 bg-gray-600 rounded"></div>
              </div>

              {/* Lines skeleton */}
              <div className="space-y-2 mt-3">
                <div className="h-3 w-3/4 bg-gray-700 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-700 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Console;
