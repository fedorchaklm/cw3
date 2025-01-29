import {createBrowserRouter} from "react-router";
import {MainLayout} from "../layouts/main-layout/MainLayout.tsx";
import {HomePage} from "../pages/home-page/HomePage.tsx";
import {LoginPage} from "../pages/login-page/LoginPage.tsx";
import {UsersPage} from "../pages/users-page/UsersPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {
                path: '', element: <HomePage/>, children: [
                    {path: '/login', element: <LoginPage/>},
                    {path: '/users', element: <UsersPage/>},

                ]
            },
        ]
    }
])