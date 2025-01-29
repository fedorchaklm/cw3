import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import IUser from "../../models/IUser.ts";
import {userService} from "../../services/api.service.ts";

type usersSliceType = {
    users: Array<IUser>
}

const userSliceInitialState: usersSliceType = {
    users: []
}

const loadUsers = createAsyncThunk('usersSlice/loadUser',
    async (page: number, thunkAPI) => {
        try {
            const users = await userService.getUsersByPage(page);
            console.log(users);
            return thunkAPI.fulfillWithValue(users)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: userSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
})

export const usersSliceActions = {...usersSlice.actions, loadUsers};