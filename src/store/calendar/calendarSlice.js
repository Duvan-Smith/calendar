import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temp = {
  _id: new Date().getTime(),
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
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;
