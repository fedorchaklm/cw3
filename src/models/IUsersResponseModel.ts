import IUser from "./IUser.ts";

export interface IUsersResponseModel {
    limit: number;
    skip: number;
    total: number;
    users: Array<IUser>;
}