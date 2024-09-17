import { configureStore } from "@reduxjs/toolkit";
import orgReducer from "./reducers/orgSlice.ts";

export const store = configureStore({
  reducer: {
    organization: orgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
