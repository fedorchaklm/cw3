import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user-slice/userSlice.ts";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer
    }
});