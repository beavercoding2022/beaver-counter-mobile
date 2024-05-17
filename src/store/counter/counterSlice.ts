import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type Counter = {
  value: number;
  step: number;
  name: string;
  id: string;
};

export type CounterState = {
  counters: Counter[];
};

const initialState: CounterState = {
  counters: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCounter(state, action: PayloadAction<Counter>) {
      state.counters.push(action.payload);
    },
    removeCounter(state, action: PayloadAction<string>) {
      state.counters = state.counters.filter(ct => ct.id !== action.payload);
    },
    incrementCounter(state, action: PayloadAction<string>) {
      const counter = state.counters.find(ct => ct.id === action.payload);
      if (counter) {
        counter.value += counter.step;
      }
    },
    decrementCounter(state, action: PayloadAction<string>) {
      const counter = state.counters.find(ct => ct.id === action.payload);
      if (counter) {
        counter.value -= counter.step;
      }
    },
  },
  selectors: {
    selectCounters: (state: CounterState) => state,
  },
});

export const {addCounter, removeCounter, incrementCounter, decrementCounter} =
  counterSlice.actions;

export const {selectCounters} = counterSlice.selectors;

export default counterSlice.reducer;
