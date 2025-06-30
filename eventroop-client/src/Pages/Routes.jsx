import { createBrowserRouter } from "react-router";
import Main from "./Main/Main";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    }
])