import {IRecipesResponseModel} from "../models/IRecipesResponseModel.ts";
import {limitOfRecipesPage} from "../constants/constants.ts";
import {IRecipe} from "../models/IRecipe.ts";
import {axiosInstance} from "./api.service.ts";

export const recipeService = {
    getRecipesByPage: async (page: number): Promise<IRecipesResponseModel> => {
        const limit = limitOfRecipesPage;
        const skip = limit * page - limit;
        const {data} = await axiosInstance.get<IRecipesResponseModel>(`/recipes?skip=${skip}&limit=${limit}`);
        return data;
    },
    getRecipesByTag: async (tag: string, page: number): Promise<IRecipesResponseModel> => {
        const limit = limitOfRecipesPage;
        const skip = limit * page - limit;
        const {data} = await axiosInstance.get<IRecipesResponseModel>(`/recipes/tag/${tag}?skip=${skip}&limit=${limit}`);
        return data;
    },
    getRecipeById: async (id: string): Promise<IRecipe> => {
        const {data: user} = await axiosInstance.get<IRecipe>(`/recipes/${id}`);
        return user;
    },
    getTagsOfRecipes: async (): Promise<Array<string>> => {
        const {data: tags} = await axiosInstance.get<Array<string>>(`/recipes/tags`);
        return tags;
    }
};
