import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import IUser from "../../models/IUser.ts";
import {userService} from "../../services/user.api.service.ts";

type userSliceType = {
    user: IUser | null;
};

const userSliceInitialState: userSliceType = {
    user: null
};

const loadUser = createAsyncThunk('userSlice/loadUser',
    async (id: string, thunkAPI) => {
        try {
            const user = await userService.getUserById(id);
            return thunkAPI.fulfillWithValue(user)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: userSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
});

export const userSliceActions = {...userSlice.actions, loadUser};