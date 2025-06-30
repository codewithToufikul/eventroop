import { createBrowserRouter } from "react-router";
import Main from "./Main/Main";
import Register from "./Register/Register";
import Login from "./Login/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
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