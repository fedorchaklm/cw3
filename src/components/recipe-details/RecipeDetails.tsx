import {Link, useParams} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {recipeSliceActions} from "../../redux/recipe-slice/recipeSlice.ts";
import {useEffect} from "react";
import {Loading} from "../loading/Loading.tsx";
import './RecipeDetails.css';

export const RecipeDetails = () => {
    const {recipeId} = useParams();
    const {recipe} = useAppSelector(({recipeSlice}) => recipeSlice);
    const dispatch = useAppDispatch();
    const isRecipeLoaded = Number(recipeId) === recipe?.id;

    useEffect(() => {
        if (recipeId && !isRecipeLoaded) {
            dispatch(recipeSliceActions.loadRecipe(recipeId));
        }
    }, [recipeId, isRecipeLoaded]);

    return (
        !isRecipeLoaded ? <Loading/> :
            <div className='recipe-wrap'>
                <h1 className='text-3xl self-center'>{recipe.name}</h1>
                <img className='self-center' src={recipe.image} alt={recipe.name}/>
                <p><b>CookTimeMinutes: </b>{recipe.cookTimeMinutes} min</p>
                <p><b>PrepTimeMinutes: </b>{recipe.prepTimeMinutes} min</p>
                <p><b>Calories: </b>{recipe.caloriesPerServing}</p>
                <p><b>Difficulty: </b>{recipe.difficulty}</p>
                <p><b>Rating: </b> {recipe.rating}</p>
                <p><b>Ingredients: </b> {recipe.ingredients}</p>
                <><b>instructions: </b> {recipe.instructions}</>
                <Link to={`/users/${recipe.userId}`} className='details'>About recipe's author</Link>
            </div>
    );
}