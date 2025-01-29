import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";

type userSliceType = {
    user: IUserWithTokens | null;
}

const userSliceInitialState: userSliceType = {
    user: null
}

const loadUser = createAsyncThunk('userSlice/loadUser',
    async (_, thunkAPI) => {
        try {
            const user = null;
            return thunkAPI.fulfillWithValue(user)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: userSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
})

export const userSliceActions = {...userSlice.actions, loadUser};