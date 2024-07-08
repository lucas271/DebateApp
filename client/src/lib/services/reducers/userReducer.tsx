import { createSlice } from "@reduxjs/toolkit";


interface userType{
    name: string,
    id: string,
    email: string
}

interface initialStateType{
    user: userType,
    loading: boolean,
    isSuccess: boolean
}

const initialState = {
    user: {
        name: '',
        id: '',
        email: ''
    },
    loading: false,
    isSuccess: true,
}

const userSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})