import {RouteConfig} from "../utils/constants/Types.tsx";
import App from "../App.tsx";
import PageNotFound from "../pages/404.tsx";
import Home from "../pages/Home.tsx";
import OrderPage from "../pages/orderPage/OrderPage.tsx";
import About from "../pages/About.tsx";
import ReviewForm from "../components/forms/ReviewForm.tsx";
import Reviews from "../pages/Reviews.tsx";
import OrderHistory from "../pages/profile/OrderHistory.tsx";

export const routes: RouteConfig[] = [
    {
        path: '/',
        element: <App />,
        showOnlyOnMenu: false,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
                showOnlyOnMenu: false,
            },
            {
                path: '/order',
                element: <OrderPage />,
                showOnlyOnMenu: false,
            },
            {
                path: '/about',
                element: <About />,
                showOnlyOnMenu: false,
            },
            {
                path: '/reviews',
                element: (
                    <div>
                        <ReviewForm />
                        <Reviews />
                    </div>
                ),
                showOnlyOnMenu: false,
            },
            {
                path: '/order/:uid/history',
                element: <OrderHistory />,
                showOnlyOnMenu: true,
            },
        ],
    },
];