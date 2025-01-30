import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recipeService} from "../../services/api.service.ts";
import {IRecipesResponseModel} from "../../models/IRecipesResponseModel.ts";

type recipesSliceType = {
    recipes: IRecipesResponseModel | null
};

const recipesSliceInitialState: recipesSliceType = {
    recipes: null
};

const loadRecipes = createAsyncThunk('recipesSlice/loadRecipes',
    async (page: number, thunkAPI) => {
        try {
            const recipes = await recipeService.getRecipesByPage(page);
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
        })
});

export const recipesSliceActions = {...recipesSlice.actions, loadRecipes};