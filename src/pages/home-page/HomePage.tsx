import {Menu} from "../../components/menu/Menu.tsx";
import {Link} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const HomePage = () => {
    const {user} = useAppSelector(({userSlice}) => userSlice);

    if (!user) return <p>You need to authenticate <Link className='text-gray-500 hover:underline' to='/login'>Login</Link></p>;

    return (
        <>
            {user &&
                <div className='flex justify-center bg-black w-full'>
                    <Menu/>
                </div>
            }
        </>
    )
}