import {IRecipe} from "./IRecipe.ts";

export interface IRecipesResponseModel {
    recipes: Array<IRecipe>;
    total: number;
    skip: number;
    limit: number;
}