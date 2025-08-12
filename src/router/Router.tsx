import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {routes} from "./Routes.tsx";
import React from "react";

const router = createBrowserRouter(routes);

const RouterProviderWrapper: React.FC = () => (
    <RouterProvider router={router}/>
);

export {RouterProviderWrapper};