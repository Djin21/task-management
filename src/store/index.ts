import {
  configureStore,
} from "@reduxjs/toolkit";
import { taskSlice } from "./taskSlice";
import { authSlice } from "./authSlice";


export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    auth: authSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
