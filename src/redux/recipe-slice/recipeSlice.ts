import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recipeService} from "../../services/api.service.ts";
import {IRecipe} from "../../models/IRecipe.ts";

type recipeSliceType = {
    recipe: IRecipe | null;
};

const recipeSliceInitialState: recipeSliceType = {
    recipe: null
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