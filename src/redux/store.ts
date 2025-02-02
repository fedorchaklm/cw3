import {configureStore} from "@reduxjs/toolkit";
import {currentUserSlice} from "./current-user-slice/currentUserSlice.ts";
import {userSlice} from "./user-slice/userSlice.ts";
import {recipeSlice} from "./recipe-slice/recipeSlice.ts";
import {tagsSlice} from "./tags-slice/tagsSlice.ts";

export const store = configureStore({
    reducer: {
        currentUserSlice: currentUserSlice.reducer,
        userSlice: userSlice.reducer,
        recipeSlice: recipeSlice.reducer,
        tagsSlice: tagsSlice.reducer
    }
});