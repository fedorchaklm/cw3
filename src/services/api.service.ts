import axios from "axios";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {retrieveLocalStorage} from "../helpers/localStorageHelpers.ts";
import {authService} from "./auth.api.service.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";

const baseUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
});

axiosInstance.interceptors.request.use((request) => {
    if (request.method?.toUpperCase() === "GET") {
        const token = retrieveLocalStorage<IUserWithTokens>('user')?.accessToken;
        if (token) {
            request.headers.authorization = 'Bearer ' + token;
        }
    }
    return request;
});

const isTokenExpired = (token: string): boolean => {
    const decodedData: JwtPayload = jwtDecode(token);
    if (!decodedData.exp) return true;
    const currentTime: number = Math.floor(Date.now() / 1000);
    return decodedData.exp < currentTime;
};

axiosInstance.interceptors.request.use(async (request) => {
    if (request.method?.toUpperCase() === "GET") {
        const token = retrieveLocalStorage<IUserWithTokens>('user')?.accessToken;
        if (token) {
            if (isTokenExpired(token)) {
                try {
                    const newToken = await authService.refreshToken();
                    if (newToken) {
                        request.headers.Authorization = 'Bearer ' + newToken;
                    }
                } catch (e) {
                    console.info(e);
                }
            }
        } else {
            request.headers.authorization = 'Bearer ' + token;
        }
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);



