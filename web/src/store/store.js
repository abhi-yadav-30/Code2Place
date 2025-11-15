import { configureStore } from "@reduxjs/toolkit";
// import utilesReducer from "../slices/themeSlice";
import utilesReducer from "./utilesSlice";

export const store = configureStore({
  reducer: {
    utiles: utilesReducer,
  },
});
