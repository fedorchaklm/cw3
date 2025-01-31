import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUsersResponseModel} from "../../models/IUsersResponseModel.ts";
import {userService} from "../../services/user.api.service.ts";

type usersSliceType = {
    users: IUsersResponseModel | null,
    error: string
};

const userSliceInitialState: usersSliceType = {
    users: null,
    error: ''
};

const loadUsers = createAsyncThunk('usersSlice/loadUsers',
    async ({page, searchParam}: { page: number, searchParam: string }, thunkAPI) => {
        try {
            const users = await userService.getUsersByPage(page, searchParam);
            console.log(users);
            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
    });

// const loadUsersBySearchParam = createAsyncThunk('usersSlice/loadUsers',
//     async (searchParam: string, thunkAPI) => {
//         try {
//             const users = await userService.getUserBySearchParam(searchParam);
//             console.log(users);
//             return thunkAPI.fulfillWithValue(users)
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e)
//         }
//     });

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: userSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUsersResponseModel>) => {
            state.users = action.payload;
        })
            .addCase(loadUsers.rejected, (state, action) => {
                console.log('> 2', action);
                state.error = action.payload as string;
            })
});

export const usersSliceActions = {...usersSlice.actions, loadUsers};