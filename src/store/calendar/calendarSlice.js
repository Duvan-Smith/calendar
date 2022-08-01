import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temp = {
  title: "Cumple años",
  notes: "Pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "12",
    name: "Duvan",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [temp],
    activeEvent: null,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
});

export const { increment } = calendarSlice.actions;