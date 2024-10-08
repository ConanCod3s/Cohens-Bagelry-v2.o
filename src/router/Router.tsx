import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import About from '../pages/About';
import PageNotFound from '../pages/404';
import OrderPage from '../pages/orderTabs/OrderPage';
import Home from '../pages/Home';
import { UserProvider } from '../services/providers/User';
import { RouteConfig } from '../utils/constants/Types';
import OrderHistory from '../pages/profile/OrderHistory';
import { useEffect } from 'react';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { auth } from '../services/firebase/Calls';

export const routes: RouteConfig[] = [
    {
        path: '/',
        element: <App />,
        showOnlyOnMenu: false,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '',
                element: <Home />,
                showOnlyOnMenu: false
            },
            {
                path: 'Order',
                element: <OrderPage />,
                showOnlyOnMenu: false
            },
            {
                path: 'About',
                element: <About />,
                showOnlyOnMenu: false
            },
            {
                path: 'Order/:uid/History',
                element: <OrderHistory />,
                showOnlyOnMenu: true
            }

        ]
    },
];

const router = createBrowserRouter(routes);

const Router = () => {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
};

export default Router;
