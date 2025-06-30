import { createBrowserRouter } from "react-router";
import Main from "./Main/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>
    }
])