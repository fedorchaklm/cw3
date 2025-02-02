import {LoginDataType} from "../models/LoginDataType.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {retrieveLocalStorage, saveToLocalStorage} from "../helpers/localStorageHelpers.ts";
import {axiosInstance} from "./api.service.ts";
import {ITokensPair} from "../models/ITokensPair.ts";

export const authService = {
    login: async (loginData: LoginDataType): Promise<IUserWithTokens> => {
        const {data: userWithToken} = await axiosInstance.post<IUserWithTokens>(`auth/login`, loginData);
        saveToLocalStorage('user', userWithToken);
        console.log(userWithToken);
        return userWithToken;
    },
    refreshToken: async (): Promise<IUserWithTokens | undefined> => {
        const userWithTokens = retrieveLocalStorage<IUserWithTokens>('user');
        if (userWithTokens) {
            const {
                data: {
                    refreshToken,
                    accessToken
                }
            } = await axiosInstance.post<ITokensPair>('/auth/refresh', {
                refreshToken: userWithTokens.refreshToken
            });
            userWithTokens.accessToken = accessToken;
            userWithTokens.refreshToken = refreshToken;
            saveToLocalStorage('user', userWithTokens);
            return userWithTokens;
        }
    }
}