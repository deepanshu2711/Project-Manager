import { configureStore } from "@reduxjs/toolkit";
import orgReducer from "./reducers/orgSlice.ts";
import userReducer from "./reducers/userSlice.ts";

export const store = configureStore({
  reducer: {
    organization: orgReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
