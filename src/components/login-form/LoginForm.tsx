import {useForm} from "react-hook-form";
import './LoginForm.css';
import {joiResolver} from "@hookform/resolvers/joi";
import {loginSchema} from "../../validation/loginSchema.ts";
import {useNavigate} from "react-router";
import {LoginDataType} from "../../models/LoginDataType.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {currentUserSliceActions} from "../../redux/current-user-slice/currentUserSlice.ts";
import {FC} from "react";

export const LoginForm: FC = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginDataType>({
        mode: 'all', resolver: joiResolver(loginSchema)
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const customSubmit = async (data: LoginDataType) => {
        dispatch(currentUserSliceActions.loadUser(data));
        navigate('/');
    };

    return (
        <div className='search-container'>
            <form className='search-form' onSubmit={handleSubmit(customSubmit)}>
                <legend className='text-2xl'>Login to your account</legend>
                <label htmlFor='username'>Enter your username</label>
                <input id='username' type='text'
                       autoComplete={'on'} placeholder='Username' required {...register('username')} />
                <div>{errors.username && errors.username.message}</div>
                <label htmlFor='password'>Enter your password</label>
                <input id='password' type='password' autoComplete='on'
                       required {...register('password')} />
                <div>{errors.password && errors.password.message}</div>
                <button className={isValid ? 'btn' : 'btn cursor-not-allowed'} type="submit">Login
                </button>
            </form>
        </div>
    );
}