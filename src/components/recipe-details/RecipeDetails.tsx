import {Link, useParams} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {recipeSliceActions} from "../../redux/recipe-slice/recipeSlice.ts";
import {useEffect} from "react";
import {Loading} from "../loading/Loading.tsx";
import './RecipeDetails.css';

export const RecipeDetails = () => {
    const {id} = useParams();
    const {recipe} = useAppSelector(({recipeSlice}) => recipeSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(recipeSliceActions.loadRecipe(id));
        }
    }, [id]);

    return (
        recipe === null ? <Loading/> :
            <div className='flex flex-col gap-2 mx-auto w-fit px-4'>
                <h1 className='text-3xl self-center'>{recipe.name}</h1>
                <img className='self-center' src={recipe.image} alt={recipe.name}/>
                <p><b>CookTimeMinutes: </b>{recipe.cookTimeMinutes} min</p>
                <p><b>PrepTimeMinutes: </b>{recipe.prepTimeMinutes} min</p>
                <p><b>calories: </b>{recipe.caloriesPerServing}</p>
                <p><b>Difficulty: </b>{recipe.difficulty}</p>
                <p><b>Rating: </b> {recipe.rating}</p>
                <p><b>Ingredients: </b> {recipe.ingredients}</p>
                <p><b>instructions: </b> {recipe.instructions}</p>
                <Link to={`/users/${recipe.userId}`} className='user'>About user</Link>
            </div>
    );
}