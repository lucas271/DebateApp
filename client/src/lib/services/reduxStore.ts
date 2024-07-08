import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        
    }
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

