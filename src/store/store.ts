import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth.reducer';
import secureReducer from './secure.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    secure: secureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
