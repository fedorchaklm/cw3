import {createAsyncThunk, createSlice, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {IRecipe} from "../../models/IRecipe.ts";
import {recipeService} from "../../services/recipe.api.service.ts";
import {IRecipesResponseModel} from "../../models/IRecipesResponseModel.ts";
import {AxiosError} from "axios";

type recipeSliceType = {
    recipe: IRecipe | null;
    recipes: IRecipesResponseModel | null;
    userRecipes: Array<IRecipe>;
    error: string | null;
};

const recipeSliceInitialState: recipeSliceType = {
    recipe: null,
    recipes: null,
    userRecipes: [],
    error: null,
};

const loadRecipe = createAsyncThunk('recipeSlice/loadRecipe',
    async (id: string, thunkAPI) => {
        try {
            const recipe = await recipeService.getRecipeById(id);
            return thunkAPI.fulfillWithValue(recipe);
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(`${e.status}, ${e.response?.statusText}`);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

const loadRecipes = createAsyncThunk('recipeSlice/loadRecipes',
    async ({page, searchParam}: { page: number, searchParam: string }, thunkAPI) => {
        try {
            const recipes = await recipeService.getRecipesByPage(page, searchParam);
            return thunkAPI.fulfillWithValue(recipes);
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(`${e.status}, ${e.response?.statusText}`);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

const loadRecipesByTag = createAsyncThunk('recipeSlice/loadRecipesByTag',
    async ({tag, page}: { tag: string; page: number; }, thunkAPI) => {
        try {
            const recipes = await recipeService.getRecipesByTag(tag, page);
            console.log(recipes);
            return thunkAPI.fulfillWithValue(recipes);
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(`${e.status}, ${e.response?.statusText}`);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

const loadUserRecipes = createAsyncThunk('userRecipesSlice/loadUserRecipes',
    async (id: string, thunkAPI) => {
        try {
            const recipes = await recipeService.getUserRecipes(id);
            return thunkAPI.fulfillWithValue(recipes);
        } catch (e) {
            if (e instanceof AxiosError) {
                return thunkAPI.rejectWithValue(`${e.status}, ${e.response?.statusText}`);
            }
            return thunkAPI.rejectWithValue(e);
        }
    });

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: recipeSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadRecipe.fulfilled, (state, action: PayloadAction<IRecipe>) => {
            state.recipe = action.payload;
        }).addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipesResponseModel>) => {
            state.recipes = action.payload;
        }).addCase(loadRecipesByTag.fulfilled, (state, action: PayloadAction<IRecipesResponseModel>) => {
            state.recipes = action.payload;
        }).addCase(loadUserRecipes.fulfilled, (state, action: PayloadAction<Array<IRecipe>>) => {
            state.userRecipes = action.payload;
        }).addMatcher(isRejected(loadRecipe, loadRecipes, loadRecipesByTag, loadUserRecipes), (state, action) => {
            state.error = action.payload as string;
        })
});

export const recipeSliceActions = {...recipeSlice.actions, loadRecipe, loadRecipes, loadRecipesByTag, loadUserRecipes};