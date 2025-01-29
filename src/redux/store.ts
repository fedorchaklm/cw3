import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./users-slice/usersSlice.ts";
import {currentUserSlice} from "./current-user-slice/currentUserSlice.ts";
import {userSlice} from "./user-slice/userSlice.ts";

export const store = configureStore({
    reducer: {
        currentUserSlice: currentUserSlice.reducer,
        usersSlice: usersSlice.reducer,
        userSlice: userSlice.reducer
    }
});