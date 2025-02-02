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
import {TagsList} from "../tags-list/TagsList.tsx";
import {Search} from "../search/Search.tsx";
import {NotFound} from "../not-found/NotFound.tsx";
import {SearchDataType} from "../../models/SearchDataType.ts";
import {recipeSliceActions} from "../../redux/recipe-slice/recipeSlice.ts";
import './RecipesList.css';

export const RecipesList: FC = () => {
    const {recipes} = useAppSelector(({recipeSlice}) => recipeSlice);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const page = query.get('page') || '1';
    const tag = query.get('tag');
    const q = query.get('q');

    useEffect(() => {
        const page = query.get('page') || '1';
        const q = query.get('q') || '';
        if (tag) {
            dispatch(recipeSliceActions.loadRecipesByTag({tag, page: Number(page)}));
        } else {
            dispatch(recipeSliceActions.loadRecipes({page: Number(page), searchParam: q}));
        }
    }, [page, tag, q]);

    const onSubmit = (searchData: SearchDataType) => {
        setQuery({q: searchData.search, page: '1'});
    };

    return (
        recipes === null ? <Loading/> :
            <div className='recipe-list-container'>
                <Search onSubmit={onSubmit}/>
                {recipes.recipes.length > 0 ?
                    <div className='recipe-list'>
                        <h1 className='recipe-title'>Recipes:</h1>
                        {recipes.recipes.map((recipe: IRecipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
                        <Pagination maxPages={getMaxPages(recipes.total, limitOfRecipesPage)}/>
                        <TagsList/>
                    </div>
                    : <NotFound/>}
            </div>
    );
}

