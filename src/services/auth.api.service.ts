import {LoginDataType} from "../models/LoginDataType.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {saveToLocalStorage} from "../helpers/localStorageHelpers.ts";
import {axiosInstance} from "./api.service.ts";

export const authService = {
    login: async (loginData: LoginDataType): Promise<IUserWithTokens> => {
        const {data: userWithToken} = await axiosInstance.post<IUserWithTokens>(`auth/login`, loginData);
        console.log(userWithToken);
        saveToLocalStorage('user', userWithToken);
        return userWithToken;
    }
};