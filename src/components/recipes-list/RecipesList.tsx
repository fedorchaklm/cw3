import {FC, useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Loading} from "../loading/Loading.tsx";
import {IRecipe} from "../../models/IRecipe.ts";
import {Pagination} from "../pagination/Pagination.tsx";
import {getMaxPages} from "../../helpers/helpers.ts";
import {limitOfRecipesPage} from "../../constants/constants.ts";
import {Recipe} from "../recipe/Recipe.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useSearchParams} from "react-router";
import {recipesSliceActions} from "../../redux/recipes-slice/recipesSlice.ts";

export const RecipesList: FC = () => {
    const {recipes} = useAppSelector(({recipesSlice}) => recipesSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();

    useEffect(() => {
        const page = query.get('page') || '1';
        dispatch(recipesSliceActions.loadRecipes(Number(page)));
    }, [query]);

    return (
        recipes === null ? <Loading/> :
            <div className='flex flex-col items-center gap-2 my-4'>
                <h1 className='text-3xl'>Our recipes:</h1>
                {recipes.recipes.map((recipe: IRecipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
                <Pagination maxPages={getMaxPages(recipes.total, limitOfRecipesPage)}/>
            </div>
    );
}