import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

