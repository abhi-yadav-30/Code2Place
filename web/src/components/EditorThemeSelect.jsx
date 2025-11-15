import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { setEditorTheme } from "../store/utilesSlice";



const themes = [
  { label: "Light", value: "vs" },
  { label: "Dark", value: "vs-dark" },
  { label: "High Contrast", value: "hc-black" },
];

const EditorThemeSelect = () => {

    const dispatch = useDispatch();
    const theme = useSelector((state) => state.utiles.editorTheme);

    const handleThemeChange = (e) => {
      dispatch(setEditorTheme(e.target.value));
    };
  return (
    <select
      value={theme}
      onChange={handleThemeChange}
      className="w-20 px-1 py-2 text-white rounded-lg bg-[#262626]
                 text-sm focus:ring-2 focus:outline-none cursor-pointer"
    >
      {themes.map((t) => (
        <option
          key={t.value}
          value={t.value}
          className="py-2 px-2 bg-[#262626] text-white"
        >
          {t.label}
        </option>
      ))}
    </select>
  );
}

export default EditorThemeSelect
