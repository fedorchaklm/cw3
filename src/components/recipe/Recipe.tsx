import {FC} from "react";
import {Link} from "react-router";
import './Recipe.css';
import {IRecipe} from "../../models/IRecipe.ts";

type RecipeType = {
    recipe: IRecipe;
};

export const Recipe: FC<RecipeType> = ({recipe}) => {
    return (
        <Link to={`/recipes/${recipe.id}`} className='user'>
            <p>{recipe.name}</p>
        </Link>
    );
}