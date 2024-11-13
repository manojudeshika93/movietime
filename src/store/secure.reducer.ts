import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define the AccessTokenState interface
interface AccessTokenState {
  token: string | null; // Use `null` when no token is set
}

// Initial state
const initialAccessTokenState: AccessTokenState = {
  token: null,
};

// Redux slice for managing access token
const secure = createSlice({
  name: 'accessToken',
  initialState: initialAccessTokenState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearAccessToken(state) {
      state.token = null; // Clear the token
    },
  },
});

// Export actions
export const { setAccessToken, clearAccessToken } = secure.actions;

// Export reducer
export default secure.reducer;
