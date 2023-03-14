import { configureStore, createSlice } from "@reduxjs/toolkit"
import themeSlice from "./ThemeReducer";

const initialAuthState = {
  isAuthenticated: false,
  token: null
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, token) {
      state.isAuthenticated = true;
      state.token = token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    }
  }
})

const store = configureStore({
  reducer: { auth: authSlice.reducer, theme: themeSlice.reducer }
})

export const authActions = authSlice.actions;

export default store;