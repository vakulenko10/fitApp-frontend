import { configureStore } from "@reduxjs/toolkit";
import calorieReducer from "./calorieSlice";

const store = configureStore({
  reducer: {
    calories: calorieReducer,
  },
});

export default store;
