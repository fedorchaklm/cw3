import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUsersResponseModel} from "../../models/IUsersResponseModel.ts";
import {userService} from "../../services/user.api.service.ts";

type UsersSliceType = {
    users: IUsersResponseModel | null;
};

const userSliceInitialState: UsersSliceType = {
    users: null,
};

const loadUsers = createAsyncThunk('usersSlice/loadUsers',
    async ({page, searchParam}: { page: number, searchParam: string }, thunkAPI) => {
        try {
            const users = await userService.getUsersByPage(page, searchParam);
            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: userSliceInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
    }
});

export const usersSliceActions = {...usersSlice.actions, loadUsers};
