import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {userSliceActions} from "../../redux/user-slice/userSlice.ts";
import {useParams} from "react-router";
import {Loading} from "../loading/Loading.tsx";
import {formatDate} from "../../helpers/helpers.ts";
import {IRecipe} from "../../models/IRecipe.ts";
import {Recipe} from "../recipe/Recipe.tsx";
import {userRecipesSliceActions} from "../../redux/user-recipes-slice/userRecipesSlice.ts";

export const UserDetails = () => {
    const {userId} = useParams();
    const {user} = useAppSelector(({userSlice}) => userSlice);
    const {userRecipes} = useAppSelector(({userRecipesSlice}) => userRecipesSlice);
    const dispatch = useAppDispatch();
    const isUserLoaded = Number(userId) === user?.id;

    useEffect(() => {
        if (userId && !isUserLoaded) {
            dispatch(userSliceActions.loadUser(userId));
            dispatch(userRecipesSliceActions.loadUserRecipes(userId))
        }
    }, [userId, isUserLoaded]);


    return !isUserLoaded ? <Loading/> :
        <div className='flex flex-col items-center justify-center gap-4 w-full text-2xl py-4'>
            <div className='flex justify-center gap-10'>
                <div>
                    <img className='w-40' src={user.image} alt={user.lastName}/>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl'>Information about {user.firstName} {user.lastName}</h1>
                    <p>Username: {user.username}</p>
                    <p>Age: {user.age}</p>
                    <p>Gender: {user.gender}</p>
                    <p>Birthdate: {formatDate(user.birthDate)}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Address: {user.address.stateCode}, {user.address.state}, {user.address.country}, {user.address.city}, {user.address.address}</p>
                    <hr className='h-px my-8 bg-white border-0'/>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <h2 className='text-2xl'>{user.firstName}`s recipes:</h2>
                {userRecipes.length > 0 ? userRecipes.map((recipe: IRecipe) =>
                    <Recipe key={recipe.id} recipe={recipe}/>) : <p>No recipes yet</p>}
            </div>
        </div>
}