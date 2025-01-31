import {RecipesList} from "../../components/recipes-list/RecipesList.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Link} from "react-router";

export const RecipesPage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) {
        return (
            <p>You need to authenticate
                <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
            </p>
        );
    }

    return (
        <div className='bg-[url(/assets/croissant.jpg)] bg-center bg-cover bg-fixed'>
            <RecipesList/>
        </div>
    );
}