import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CodeEditor from "./components/CodeEditor";
import "./App.css";
import Editor from "@monaco-editor/react";
import SelectLang from "./components/SelectLang";
import EditorFooter from "./components/EditorFooter";
import { useSelector } from "react-redux";
import EditorHead from "./components/EditorHead";
import DescriptionHeader from "./components/DescriptionHeader";
import Description from "./components/Description";
import Console from "./components/Console";
import { useEffect } from "react";
import QuestionsListPage from "./pages/QuestionListPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <div className="pt-16 h-screen overflow-hidden">
      <Router>
        <Navbar />

        <div>
          {/* padding so content does not hide behind navbar */}
          <Routes>
            <Route path="/Auth" element={<AuthPage />} />
            <Route
              path="/questions"
              element={
                <ProtectedRoute>
                  <QuestionsListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/questions/:id"
              element={
                <ProtectedRoute>
                  <QuestionPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
