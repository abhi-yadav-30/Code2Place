import React, { useEffect, useState } from "react";

const Submissions = ({ quesId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/submission/${quesId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error("Error:", data.msg);
          return;
        }

        setSubmissions(data.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [quesId]);

  if (loading) return <div className="p-4 text-gray-300">Loading...</div>;

  return (
    <div className="p-4 text-sm text-gray-200">
      <h2 className="font-bold text-xl mb-4 text-white">Your Submissions</h2>

      {submissions.length === 0 ? (
        <div className="text-gray-400">No submissions yet.</div>
      ) : (
        <div className="w-full border border-gray-700 rounded-lg overflow-hidden bg-[#1e1e1e]">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-[#2c2c2c]">
              <tr className="text-gray-300 text-left">
                <th className="p-3 border-b border-gray-700">Status</th>
                <th className="p-3 border-b border-gray-700">Runtime</th>
                <th className="p-3 border-b border-gray-700">Memory</th>
                <th className="p-3 border-b border-gray-700">Language</th>
                <th className="p-3 border-b border-gray-700">Date</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="hover:bg-[#333333] transition border-b border-gray-800"
                >
                  {/* STATUS */}
                  <td className="p-3 font-semibold">
                    <span
                      className={`px-2 py-1 rounded-md text-md font-bold 
                        ${
                          sub.status.verdict === "Accepted"
                            ? " text-green-500"
                            : "text-red-600"
                        }
                      `}
                    >
                      {sub.status.verdict}
                    </span>
                  </td>

                  {/* RUNTIME */}
                  <td className="p-3 text-gray-300">
                    <i
                      className="fa-solid fa-clock fa-sm"
                      style={{ color: "#858585" }}
                    ></i>{" "}
                    {sub.runtime ? `${sub.runtime} ms` : "-"}
                  </td>

                  {/* MEMORY */}
                  <td className="p-3 text-gray-300">
                    <i
                      className="fa-solid fa-memory fa-sm"
                      style={{ color: "#858585" }}
                    ></i>{" "}
                    {sub.memory ? `${sub.memory} KB` : "-"}
                  </td>

                  {/* LANGUAGE */}
                  <td className="p-3 text-gray-300">
                    <span className="bg-[#3a3a3a] px-2 py-1 rounded-md text-xs">
                      {sub.language?.monaco || "-"}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="p-3 text-gray-400">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Submissions;
