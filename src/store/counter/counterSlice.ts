import {getRandomIconFromList} from '@/common/utils/icon';
import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

export type Counter = {
  icon?: string;
  color?: {
    backgroundColor?: string;
    textColor?: string;
  };
  value: number;
  step: number;
  name: string;
  id: string;
  history?: {
    date: string;
    value: number;
  }[];
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
    addRandomCounter(state) {
      state.counters.push({
        icon: getRandomIconFromList(),

        value: 0,
        step: 1,
        name: '카운터' + state.counters.length,
        id: nanoid(),
      });
    },
    addCounter(
      state,
      action: PayloadAction<Partial<Pick<Counter, 'id'>> & Omit<Counter, 'id'>>,
    ) {
      state.counters.push({
        ...action.payload,
        id: nanoid(),
      });
    },
    removeCounter(state, action: PayloadAction<string>) {
      state.counters = state.counters.filter(ct => ct.id !== action.payload);
    },
    removeAllCounters(state) {
      state.counters = [];
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
    updateCounterConfig(
      state,
      action: PayloadAction<{id: string; config: Partial<Counter>}>,
    ) {
      const counterIndex = state.counters.findIndex(
        ct => ct.id === action.payload.id,
      );

      if (counterIndex > -1) {
        state.counters[counterIndex] = {
          ...state.counters[counterIndex],
          ...action.payload.config,
        };
      }
    },
  },
  selectors: {
    selectAllCounters: (state: CounterState) => state,
    selectCountersByIds: createSelector(
      (state: CounterState) => state,
      (_: unknown, ids: string[]) => ids,
      state => state.counters,
    ),
    selectCountersPaginated: createSelector(
      (state: CounterState) => state,
      (_: unknown, page: number, pageSize: number) => ({page, pageSize}),
      (state, {page, pageSize}) =>
        state.counters.slice(page * pageSize, (page + 1) * pageSize),
    ),
    selectCounter: createSelector(
      [(state: CounterState) => state, (_: unknown, id: string) => id],
      (state, id) => state.counters.find(ct => ct.id === id),
    ),
  },
});

export const {
  addCounter,
  addRandomCounter,
  removeCounter,
  removeAllCounters,
  incrementCounter,
  decrementCounter,
  updateCounterConfig,
} = counterSlice.actions;

export const {
  selectAllCounters,
  selectCountersByIds,
  selectCounter,
  selectCountersPaginated,
} = counterSlice.selectors;

export default counterSlice.reducer;
