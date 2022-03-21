import { createSlice } from "@reduxjs/toolkit";

import * as reset from "./index"

const resetSlice = createSlice({
    name : 'AdminSlice',
    initialState: {
        data: [],
        loaded: false,
        status: null,
        message: null
    },

    reducers:{

    },

    extraReducers: {
            // TOOLKIT FOR FETCHING OF MASTER SAFE CODES
            [reset.getMasterSafeCode.pending] : (state => {
                state.status = "Loading"
                state.loaded = false
            }),
            [reset.getMasterSafeCode.fulfilled] : ((state, action) => {
                state.data = action.payload
                state.loaded = true
                state.status = "Loaded successfully"
            }),
            [reset.getMasterSafeCode.rejected] : (state, action) => {
                state.data = []
                state.loaded = false
                state.status = "Failed"
                state.error = action
            },
    }

})


export const resetReducer = ({reset}) => reset
export default resetSlice.reducer