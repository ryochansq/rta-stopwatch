import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  index: number;
  titles: string[];
  records: Time[][];
  laps: Time[];
};

const initialState: State = {
  index: -1,
  titles: ['Step1', 'Step2'],
  records: [
    [
      { hours: 0, minutes: 0, seconds: 32 },
      { hours: 1, minutes: 23, seconds: 43 },
    ],
    [
      { hours: 0, minutes: 0, seconds: 45 },
      { hours: 1, minutes: 21, seconds: 56 },
    ],
  ],
  laps: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    increment(state: State, action: PayloadAction<Time>) {
      if (state.index >= state.titles.length) return;
      if (state.index >= 0) state.laps.push(action.payload);
      state.index += 1;
    },
    resetLap(state: State) {
      state.index = -1;
      state.laps = [];
    },
    setChart(state: State, action: PayloadAction<{ titles: string[]; records: Time[][] }>) {
      state.titles = action.payload.titles;
      state.records = action.payload.records;
    },
    updateAndReset(state: State) {
      state.records.push(state.laps);
      state.index = -1;
      state.laps = [];
    },
  },
});

export const { increment, setChart, resetLap, updateAndReset } = timerSlice.actions;

export default timerSlice;
