import {createAsyncThunk, createSlice, isRejected, PayloadAction} from "@reduxjs/toolkit";
import IUser from "../../models/IUser.ts";
import {userService} from "../../services/user.api.service.ts";
import {IUsersResponseModel} from "../../models/IUsersResponseModel.ts";
import {AxiosError} from "axios";

type userSliceType = {
    user: IUser | null;
    users: IUsersResponseModel | null;
    error: string | null;
};

const userSliceInitialState: userSliceType = {
    user: null,
    users: null,
    error: null,
};

const loadUser = createAsyncThunk('userSlice/loadUser',
    async (id: string, thunkAPI) => {
        try {
            const user = await userService.getUserById(id);
            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(`${e.status}, ${e.response?.statusText}`);
                return thunkAPI.rejectWithValue(`${e.status}, ${e.response?.statusText}`);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

const loadUsers = createAsyncThunk('userSlice/loadUsers',
    async ({page, searchParam}: { page: number, searchParam: string }, thunkAPI) => {
        try {
            const users = await userService.getUsersByPage(page, searchParam);
            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(`${e.status}, ${e.response?.statusText}`);

                return thunkAPI.rejectWithValue(`${e.status}, ${e.response?.statusText}`);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: userSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        }).addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUsersResponseModel>) => {
            state.users = action.payload;
        }).addMatcher(isRejected(loadUser, loadUsers), (state, action) => {
            state.error = action.payload as string;
        })
});

export const userSliceActions = {...userSlice.actions, loadUser, loadUsers};