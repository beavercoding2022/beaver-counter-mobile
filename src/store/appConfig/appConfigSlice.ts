import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';

export type AppConfigState = {
  isFirstTime: boolean;
  darkMode: boolean;
  simpleMode: boolean;
};

const initialState: AppConfigState = {
  isFirstTime: true,
  darkMode: true,
  simpleMode: true,
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setFirstTime(state, action: PayloadAction<AppConfigState['isFirstTime']>) {
      state.isFirstTime = action.payload;
    },
    setDarkMode(state, action: PayloadAction<AppConfigState['darkMode']>) {
      state.darkMode = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setSimpleMode(state, action: PayloadAction<AppConfigState['simpleMode']>) {
      state.simpleMode = action.payload;
    },
    toggleSimpleMode(state) {
      state.simpleMode = !state.simpleMode;
    },
  },
  selectors: {
    selectAppConfig: (state: AppConfigState) => state,
    selectIsFirstTime: createSelector(
      (state: AppConfigState) => state,
      state => state.isFirstTime,
    ),
    selectDarkMode: createSelector(
      (state: AppConfigState) => state,
      state => state.darkMode,
    ),
    selectSimpleMode: createSelector(
      (state: AppConfigState) => state,
      state => state.simpleMode,
    ),
  },
});

export const {
  setFirstTime,
  setDarkMode,
  setSimpleMode,
  toggleDarkMode,
  toggleSimpleMode,
} = appConfigSlice.actions;

export const {
  selectAppConfig,
  selectIsFirstTime,
  selectDarkMode,
  selectSimpleMode,
} = appConfigSlice.selectors;

export default appConfigSlice.reducer;
