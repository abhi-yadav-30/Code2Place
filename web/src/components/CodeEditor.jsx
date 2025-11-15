import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";

const CodeEditor = ({ handleCode ,code}) => {
  const theme = useSelector((state) => state.utiles.editorTheme);
  const language = useSelector((state) => state.utiles.language);

  return (
    <Editor
      height="calc(100vh - 100px)" // or any fixed height
      defaultLanguage="javascript"
      language={language.monaco}
      onChange={(value) => {
        handleCode(value);
      }}
      value={code}
      theme={theme}
    />
  );
};

export default CodeEditor;

// import React from "react";
// import ReactDOM from "react-dom";

// import Editor from "@monaco-editor/react";

// function App() {
//   return (

//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
