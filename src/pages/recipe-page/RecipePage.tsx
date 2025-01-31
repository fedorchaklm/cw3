import {RecipeDetails} from "../../components/recipe-details/RecipeDetails.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Link} from "react-router";
import  './RecipePage.css';

export const RecipePage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) {
        return (
            <p>You need to authenticate
                <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
            </p>
        );
    }

    return (
        <div className='recipe-page'>
            <RecipeDetails/>
        </div>
    );
}