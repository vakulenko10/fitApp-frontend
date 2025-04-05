import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  age: 25,
  gender: "male",
  weight: 70,
  height: 170,
  activityLevel: "moderate",
  goal: "loseWeight",
  calculatedCalories: null,
  isModalOpen: false,
};

const calorieSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setActivityLevel: (state, action) => {
      state.activityLevel = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    setCalculatedCalories: (state, action) => {
      state.calculatedCalories = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setAge,
  setGender,
  setWeight,
  setHeight,
  setActivityLevel,
  setGoal,
  setCalculatedCalories,
  setIsModalOpen,
} = calorieSlice.actions;

export default calorieSlice.reducer;
