import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";
import {authService} from "../../services/api.service.ts";
import {LoginDataType} from "../../models/LoginDataType.ts";

type currentUserSliceType = {
    currentUser: IUserWithTokens | null;
}

const currentUserSliceInitialState: currentUserSliceType = {
    currentUser: null
}

const loadUser = createAsyncThunk('currentUserSlice/loadUser',
    async (loginData: LoginDataType, thunkAPI) => {
        try {
            const user = await authService.login(loginData);
            return thunkAPI.fulfillWithValue(user)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: currentUserSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        })
})

export const currentUserSliceActions = {...currentUserSlice.actions, loadUser};