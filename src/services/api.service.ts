import axios from "axios";
import {LoginDataType} from "../models/LoginDataType.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {retriveLocalStorage, saveToLocalStorage} from "../helpers/localStorageHelpers.ts";
import IUser from "../models/IUser.ts";
import {IUsersResponseModel} from "../models/IUsersResponseModel.ts";

// export const apiService = {
//     getAll: async <T>(url: string): Promise<Array<T>> => {
//         const response = await fetch(url);
//         return await response.json();
//     },
//     login: async(url:string) => {
//         const response = await fetch(url);
//         return await response.json();
//     }
// }

const baseUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use((request) => {
    if (request.method?.toUpperCase() === "GET") {
        request.headers.authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }
    return request;
})

export const authService = {
    login: async (loginData: LoginDataType): Promise<IUserWithTokens> => {
        const {data: userWithToken} = await axiosInstance.post<IUserWithTokens>(`auth/login`, loginData);
        console.log(userWithToken);
        saveToLocalStorage('user', userWithToken);
        return userWithToken;
    }
}

export const userService = {
    // getAll: async (): Promise<Array<IUser>> => {
    //     const {data: {users}} = await axiosInstance.get<IUsersResponseModel>('/users');
    //     console.log('>', users);
    //     return users;
    // },
    getUsersByPage: async (page: number): Promise<Array<IUser>> => {
        const limit = 30;
        const skip = limit * page - limit;
        const {data: {users}} = await axiosInstance.get<IUsersResponseModel>(`/users?skip=${skip}`);
        return users;
    },
    getUserById: async (id: string): Promise<IUser> => {
        const {data: user} = await axiosInstance.get<IUser>(`/users/${id}`);
        return user;
    }
}



