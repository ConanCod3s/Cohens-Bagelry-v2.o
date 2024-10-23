import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from '../App';
import About from '../pages/About';
import PageNotFound from '../pages/404';
import OrderPage from '../pages/orderPage/OrderPage';
import Home from '../pages/Home';
import {RouteConfig} from '../utils/constants/Types';
import OrderHistory from '../pages/profile/OrderHistory';
import Reviews from "../pages/Reviews.tsx";

export const routes: RouteConfig[] = [
    {
        path: '/',
        element: <App/>,
        showOnlyOnMenu: false,
        errorElement: <PageNotFound/>,
        children: [
            {
                path: '/',
                element: <Home/>,
                showOnlyOnMenu: false,
            },
            {
                path: '/order',
                element: <OrderPage/>,
                showOnlyOnMenu: false,
            },
            {
                path: '/about',
                element: <About/>,
                showOnlyOnMenu: false,
            },
            {
                path: '/reviews',
                element: <Reviews/>,
                showOnlyOnMenu: false,
            },
            {
                path: '/order/:uid/history',
                element: <OrderHistory/>,
                showOnlyOnMenu: true,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

const Router = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default Router;
