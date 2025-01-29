import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user-slice/userSlice.ts";
import {usersSlice} from "./users-slice/usersSlice.ts";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        usersSlice: usersSlice.reducer
    }
});