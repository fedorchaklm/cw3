import {createAsyncThunk, createSlice, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";
import {LoginDataType} from "../../models/LoginDataType.ts";
import {authService} from "../../services/auth.api.service.ts";
import {retrieveLocalStorage} from "../../helpers/localStorageHelpers.ts";
import {AxiosError} from "axios";

type currentUserSliceType = {
    currentUser: IUserWithTokens | null | undefined;
    error: string | null;
};

const currentUserSliceInitialState: currentUserSliceType = {
    currentUser: retrieveLocalStorage<IUserWithTokens>('user'),
    error: null
};

const loadUser = createAsyncThunk('currentUserSlice/loadUser',
    async (loginData: LoginDataType, thunkAPI) => {
        try {
            const user = await authService.login(loginData);
            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

const refreshToken = createAsyncThunk('currentUserSlice/refreshToken',
    async (_, thunkAPI) => {
        try {
            const user = await authService.refreshToken();
            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(e.response?.statusText);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

export const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: currentUserSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUser.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
            state.currentUser = action.payload;
        }).addCase(refreshToken.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        }).addMatcher(isRejected(loadUser, refreshToken), (state, action) => {
            state.error = action.payload as string;
        })
});

export const currentUserSliceActions = {...currentUserSlice.actions, loadUser, refreshToken};