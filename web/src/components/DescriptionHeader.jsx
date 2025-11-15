import React from "react";

const DescriptionHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-12 border-b border-gray-300 flex items-center text-sm">
      <button
        onClick={() => setActiveTab("description")}
        className={`px-4 h-full flex items-center font-bold text-md cursor-pointer ${
          activeTab === "description"
            ? "text-black border-b-6 border-black"
            : "text-gray-100"
        }`}
      >
        Description
      </button>

      <button
        onClick={() => setActiveTab("submissions")}
        className={`px-4 h-full flex items-center font-bold text-md cursor-pointer ${
          activeTab === "submissions"
            ? "text-black border-b-6 border-black"
            : "text-gray-100"
        }`}
      >
        Submissions
      </button>
    </div>
  );
};

export default DescriptionHeader;
