import {IUsersResponseModel} from "../models/IUsersResponseModel.ts";
import {limitOfUsersByPage} from "../constants/constants.ts";
import IUser from "../models/IUser.ts";
import {axiosInstance} from "./api.service.ts";

export const userService = {
    getUsersByPage: async (page: number, searchParam: string): Promise<IUsersResponseModel> => {
        const limit = limitOfUsersByPage;
        const skip = limit * page - limit;
        const {data} = await axiosInstance.get<IUsersResponseModel>(`auth/users/search?skip=${skip}&limit=${limit}&q=${searchParam}`);
        return data;
    },
    getUserById: async (id: string): Promise<IUser> => {
        const {data: user} = await axiosInstance.get<IUser>(`auth/users/${id}`);
        return user;
    }
};


