import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./reducers/userReducer";
import { postApi } from "./reducers/postReducer";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(postApi.middleware)
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

