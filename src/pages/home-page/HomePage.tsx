import {Menu} from "../../components/menu/Menu.tsx";
import {Link} from "react-router";

export const HomePage = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center bg-black w-full'>
                <Menu/>
            </div>
            <div>
                <p>You need to authenticate <Link className='text-gray-500 hover:underline' to='/login'>Login</Link></p>
            </div>
        </div>
    )
}