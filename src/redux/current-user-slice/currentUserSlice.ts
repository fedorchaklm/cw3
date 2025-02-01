import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";
import {LoginDataType} from "../../models/LoginDataType.ts";
import {authService} from "../../services/auth.api.service.ts";
import {retrieveLocalStorage} from "../../helpers/localStorageHelpers.ts";

type currentUserSliceType = {
    currentUser: IUserWithTokens | null;
    error: string;
};

const currentUserSliceInitialState: currentUserSliceType = {
    currentUser: retrieveLocalStorage<IUserWithTokens>('user'),
    error: ''
};

const loadUser = createAsyncThunk('currentUserSlice/loadUser',
    async (loginData: LoginDataType, thunkAPI) => {
        try {
            const user = await authService.login(loginData);
            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    });

export const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: currentUserSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        }).addCase(loadUser.rejected, (state, action) => {
            state.error = action.payload;
        })
});

export const currentUserSliceActions = {...currentUserSlice.actions, loadUser};