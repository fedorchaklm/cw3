import axios from "axios";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {retrieveLocalStorage} from "../helpers/localStorageHelpers.ts";

const baseUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use((request) => {
    if (request.method?.toUpperCase() === "GET") {
        request.headers.authorization = 'Bearer ' + retrieveLocalStorage<IUserWithTokens>('user')?.accessToken;
    }
    return request;
});

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );




