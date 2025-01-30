import {IUsersResponseModel} from "../models/IUsersResponseModel.ts";
import {limitOfUsersByPage} from "../constants/constants.ts";
import IUser from "../models/IUser.ts";
import {axiosInstance} from "./api.service.ts";

export const userService = {
    getUsersByPage: async (page: number): Promise<IUsersResponseModel> => {
        const limit = limitOfUsersByPage;
        const skip = limit * page - limit;
        const {data} = await axiosInstance.get<IUsersResponseModel>(`/users?skip=${skip}&limit=${limit}`);
        return data;
    },
    getUserById: async (id: string): Promise<IUser> => {
        const {data: user} = await axiosInstance.get<IUser>(`/users/${id}`);
        return user;
    }
};