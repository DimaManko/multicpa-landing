import { createBrowserRouter } from "react-router";

import LandingPage from "@/pages/landing";
import NotFoundPage from "@/pages/not-found";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage/> 
    },
    {
        path: '/:lang',     
        element: <LandingPage/>,
    },
    {
        path: '*',
        element: <NotFoundPage/>
    }
])