import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editorTheme: "vs-dark",
  language: { monaco: "javascript", judge: 63 },
  testCases: [],
  isRunning: false,
  isSubmitting: false,
};

const utilesSlice = createSlice({
  name: "utiles",
  initialState,
  reducers: {
    setEditorTheme: (state, action) => {
      state.editorTheme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTestCases: (state, action) => {
      state.testCases = action.payload;
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const {
  setEditorTheme,
  setLanguage,
  setTestCases,
  setIsRunning,
  setIsSubmitting,
} = utilesSlice.actions;
export default utilesSlice.reducer;
