import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IRecipe} from "../../models/IRecipe.ts";
import {recipeService} from "../../services/recipe.api.service.ts";

type userRecipesType = {
    userRecipes: Array<IRecipe>;
};

const userRecipesInitialState: userRecipesType = {
    userRecipes: []
};

const loadUserRecipes = createAsyncThunk('userRecipesSlice/loadUserRecipes',
    async (id: string, thunkAPI) => {
        try {
            const recipes = await recipeService.getUserRecipes(id);
            return thunkAPI.fulfillWithValue(recipes);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });

export const userRecipesSlice = createSlice({
    name: 'userRecipesSlice',
    initialState: userRecipesInitialState,
    reducers: {
        getUserRecipes: (state, action) => {
            state.userRecipes = action.payload;
        }
    },
    extraReducers: builder =>
        builder.addCase(loadUserRecipes.fulfilled, (state, action) => {
            state.userRecipes = action.payload;
        })
});

export const userRecipesSliceActions = {...userRecipesSlice.actions, loadUserRecipes};