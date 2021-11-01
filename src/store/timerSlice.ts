import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chartToText } from '../utils/chart';
import { saveFile } from '../utils/file';

type State = {
  index: number;
  titles: string[];
  records: Time[][];
  laps: Time[];
  fileHandle?: FileSystemFileHandle;
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
  fileHandle: null,
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
      const text = chartToText(state.titles, state.records);
      saveFile(text);
    },
    updateAndReset(state: State) {
      state.records.push(state.laps);
      state.index = -1;
      state.laps = [];
    },
    setFileHandle(state: State, action: PayloadAction<FileSystemFileHandle>) {
      state.fileHandle = action.payload;
    },
  },
});

export const { increment, setChart, resetLap, updateAndReset, setFileHandle } = timerSlice.actions;

export default timerSlice;
