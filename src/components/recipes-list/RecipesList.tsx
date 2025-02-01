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
import {Search} from "../search/Search.tsx";
import {NotFound} from "../not-found/NotFound.tsx";
import {searchDataType} from "../../models/searchDataType.ts";

export const RecipesList: FC = () => {
    const {recipes} = useAppSelector(({recipesSlice}) => recipesSlice);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const page = query.get('page') || '1';
    const tag = query.get('tag');
    const q = query.get('q');

    useEffect(() => {
        const page = query.get('page') || '1';
        console.log('>', page);
        const q = query.get('q') || '';
        console.log('>', q);
        if (tag) {
            console.log(tag);
            dispatch(recipesSliceActions.loadRecipesByTag({tag, page: Number(page)}));
        } else {
            dispatch(recipesSliceActions.loadRecipes({page: Number(page), searchParam: q}));
        }
    }, [page, tag, q]);

    const onSubmit = (searchData: searchDataType) => {
        console.log('>', searchData);
        setQuery({q: searchData.search, page: '1'});
        // dispatch(usersSliceActions.loadUsersBySearchParam(searchData.search));
    };

    return (
        recipes === null ? <Loading/> :
            <div className='flex flex-col items-center gap-2 py-4 text-xl w-full'>
                <Search onSubmit={onSubmit}/>
                {recipes.recipes.length > 0 ?
                    <div className='flex flex-col items-center gap-2 my-4'>
                        <h1 className='text-3xl text-white'>Recipes:</h1>
                        {recipes.recipes.map((recipe: IRecipe) => <Recipe key={recipe.id} recipe={recipe}/>)}
                        <Pagination maxPages={getMaxPages(recipes.total, limitOfRecipesPage)}/>
                        <TagsList/>
                    </div>
                    : <NotFound/>}
            </div>
    );
}

