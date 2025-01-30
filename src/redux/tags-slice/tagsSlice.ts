import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recipeService} from "../../services/recipe.api.service.ts";

type tagsSliceType = {
    tags: Array<string>;
};

const tagsSliceInitialState: tagsSliceType = {
    tags: []
};


const loadTags = createAsyncThunk('tagsSlice/loadTags',
    async (_, thunkAPI) => {
        try {
            const tags = await recipeService.getTagsOfRecipes();
            return thunkAPI.fulfillWithValue(tags);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    })

export const tagsSlice = createSlice({
    name: 'tagsSlice',
    initialState: tagsSliceInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadTags.fulfilled, (state, action) => {
            state.tags = action.payload;
        })
});

export const tagsSliceActions = {...tagsSlice.actions, loadTags};