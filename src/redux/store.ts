import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./users-slice/usersSlice.ts";
import {currentUserSlice} from "./current-user-slice/currentUserSlice.ts";
import {userSlice} from "./user-slice/userSlice.ts";
import {recipesSlice} from "./recipes-slice/recipesSlice.ts";
import {recipeSlice} from "./recipe-slice/recipeSlice.ts";
import {tagsSlice} from "./tags-slice/tagsSlice.ts";

export const store = configureStore({
    reducer: {
        currentUserSlice: currentUserSlice.reducer,
        usersSlice: usersSlice.reducer,
        userSlice: userSlice.reducer,
        recipesSlice: recipesSlice.reducer,
        recipeSlice: recipeSlice.reducer,
        tagsSlice: tagsSlice.reducer
    }
});