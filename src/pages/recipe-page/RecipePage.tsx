import {RecipeDetails} from "../../components/recipe-details/RecipeDetails.tsx";
import {FC} from "react";
import  './RecipePage.css';

export const RecipePage: FC = () => {

    return (
        <div className='recipe-page'>
            <RecipeDetails/>
        </div>
    );
}