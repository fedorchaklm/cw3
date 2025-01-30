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
import {TagsList} from "../tags-list/TagsList.tsx";

export const RecipesList: FC = () => {
    const {recipes} = useAppSelector(({recipesSlice}) => recipesSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const page = query.get('page') || '1';
    const tag = query.get('tag');

    useEffect(() => {
        if (tag) {
            dispatch(recipesSliceActions.loadRecipesByTag({ tag, page: Number(page) }));
        } else {
            dispatch(recipesSliceActions.loadRecipes(Number(page)));
        }
    }, [page, tag]);

    return (
        recipes === null ? <Loading/> :
            <div className='flex flex-col items-center gap-2 my-4'>
                <h1 className='text-3xl'>Our recipes:</h1>
                {recipes.recipes.map((recipe: IRecipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
                <Pagination maxPages={getMaxPages(recipes.total, limitOfRecipesPage)}/>
                <TagsList/>
            </div>
    );
}