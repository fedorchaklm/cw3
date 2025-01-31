import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IRecipesResponseModel} from "../../models/IRecipesResponseModel.ts";
import {recipeService} from "../../services/recipe.api.service.ts";

type RecipesSliceType = {
    recipes: IRecipesResponseModel | null
};

const recipesSliceInitialState: RecipesSliceType = {
    recipes: null
};

const loadRecipes = createAsyncThunk('recipesSlice/loadRecipes',
    async ({page, searchParam}: { page: number, searchParam: string }, thunkAPI) => {
        try {
            const recipes = await recipeService.getRecipesByPage(page, searchParam);
            console.log(recipes);
            return thunkAPI.fulfillWithValue(recipes)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });


const loadRecipesByTag = createAsyncThunk('recipesSlice/loadRecipesByTag',
    async ({tag, page}: { tag: string; page: number; }, thunkAPI) => {
        try {
            const recipes = await recipeService.getRecipesByTag(tag, page);
            console.log(recipes);
            return thunkAPI.fulfillWithValue(recipes)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });


export const recipesSlice = createSlice({
    name: 'recipesSlice',
    initialState: recipesSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload;
        }).addCase(loadRecipesByTag.fulfilled, (state, action) => {
                state.recipes = action.payload;
            })
});

export const recipesSliceActions = {...recipesSlice.actions, loadRecipes, loadRecipesByTag};