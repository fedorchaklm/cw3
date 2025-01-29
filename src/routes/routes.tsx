import {createBrowserRouter} from "react-router";
import {MainLayout} from "../layouts/main-layout/MainLayout.tsx";
import {HomePage} from "../pages/home-page/HomePage.tsx";
import {LoginPage} from "../pages/login-page/LoginPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {path: '', element: <HomePage/>},
            {path: '/login', element: <LoginPage/>}
        ]
    }
])