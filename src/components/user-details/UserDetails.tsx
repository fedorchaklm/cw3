import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {userSliceActions} from "../../redux/user-slice/userSlice.ts";
import {useParams} from "react-router";
import {Loading} from "../loading/Loading.tsx";
import {formatDate} from "../../helpers/helpers.ts";

export const UserDetails = () => {
    const {id} = useParams();
    const {user} = useAppSelector(({userSlice}) => userSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(userSliceActions.loadUser(id));
        }
    }, [id]);

    return user === null ? <Loading/> :
        <div className='flex flex-col items-center gap-2 mx-auto w-fit px-4'>
            <h1 className='text-3xl'>Information about {user.firstName} {user.lastName}</h1>
            <p>Username: {user.username}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Birthdate: {formatDate(user.birthDate)}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address.stateCode}, {user.address.state}, {user.address.country}, {user.address.city}, {user.address.address}</p>
            <img src={user.image} alt={user.lastName}/>
            {/*<div>{recipes.recipes.filter(recipe => recipe.userId === userId)}</div>*/}
        </div>;
}