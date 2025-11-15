import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../store/utilesSlice";
export function getDSALanguages() {
  return [
    {
      label: "JavaScript (Node)",
      value: JSON.stringify({ monaco: "javascript", judge: 63 }),
    },
    {
      label: "Python",
      value: JSON.stringify({ monaco: "python", judge: 71 }),
    },
    {
      label: "C++ (GCC 12)",
      value: JSON.stringify({ monaco: "cpp", judge: 105 }),
    },
    {
      label: "C (GCC 12)",
      value: JSON.stringify({ monaco: "c", judge: 104 }),
    },
    {
      label: "Java",
      value: JSON.stringify({ monaco: "java", judge: 91 }),
    },
    {
      label: "Go",
      value: JSON.stringify({ monaco: "go", judge: 60 }),
    },
    {
      label: "C#",
      value: JSON.stringify({ monaco: "csharp", judge: 51 }),
    },
    {
      label: "Rust",
      value: JSON.stringify({ monaco: "rust", judge: 73 }),
    },
  ];
}

export default function SelectLang() {
  const dispatch = useDispatch();
  const languages = getDSALanguages();

  const handleChange = (e) => {
    const value = JSON.parse(e.target.value);
    dispatch(setLanguage(value));
  };

  return (
    <select
      onChange={handleChange}
      className="w-44 px-3 py-2 bg-[#262626] text-white text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 cursor-pointer transition"
    >
      {languages.map((lang, idx) => (
        <option key={idx} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
