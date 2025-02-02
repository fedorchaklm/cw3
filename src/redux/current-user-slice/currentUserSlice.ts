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
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
            return thunkAPI.rejectWithValue('Error');
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
            console.log('> 2', action);
            state.error = action.payload as string;
        })
});

export const currentUserSliceActions = {...currentUserSlice.actions, loadUser};