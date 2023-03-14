import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialThemeState = {
  isPremium: false,
  isDarkTheme: false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setPremium(state) {
      state.isPremium = true;
    },
    setDarkTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    }
  }
})

export default themeSlice;

export const themeActions = themeSlice.actions;