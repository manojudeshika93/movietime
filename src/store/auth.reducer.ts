import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define the AuthState interface
interface AuthState {
  isLoggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  isLoggedIn: false,
};

// Redux slice for auth state
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

// Export the action
export const { setIsLoggedIn } = auth.actions;

export default auth.reducer;
