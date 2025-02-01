import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IRecipe} from "../../models/IRecipe.ts";
import {recipeService} from "../../services/recipe.api.service.ts";

type recipeSliceType = {
    recipe: IRecipe | null;
    isRecipeLoaded: boolean;
};

const recipeSliceInitialState: recipeSliceType = {
    recipe: null,
    isRecipeLoaded: false,
};

const loadRecipe = createAsyncThunk('recipeSlice/loadRecipe',
    async (id: string, thunkAPI) => {
        try {
            const recipe = await recipeService.getRecipeById(id);
            return thunkAPI.fulfillWithValue(recipe)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: recipeSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadRecipe.fulfilled, (state, action) => {
            state.recipe = action.payload;
        })
});

export const recipeSliceActions = {...recipeSlice.actions, loadRecipe};