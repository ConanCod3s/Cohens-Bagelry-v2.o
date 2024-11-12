import {ReactNode} from "react";
import {Timestamp} from "firebase/firestore";

// Review-related types
type ReviewType = {
    createdAt: Timestamp;
    name: string;
    rating: number;
    review: string;
};

// User-related types
type UserContextType = {
    loggedIn: boolean;
    userInfo: UserInfoType | null;
};

type UserInfoType = {
    displayName: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    uid: string | null;
};

type UserProviderType = {
    children: ReactNode;
};

// Order-related types
type AvailableType = {
    cost: number;
    label: string;
    maxQuantity: number;
    quantity: number;
    type: string;
    value: string;
    weight: number;
};

type OrderType = {
    costData: {
        cost: number;
        fee: number;
        totalCost: number;
    };
    day: string;
    firstName: string;
    lastName: string;
    orderId: string;
    orderStatus: "Pending" | "Confirmed" | "Declined";
    orderedByUid: string;
    phoneNumber: string;
    selections: AvailableType[];
    time: string;
    totalQuantity: number;
};

// Routing-related types
type RouteConfig = {
    children?: RouteConfig[];
    element: JSX.Element;
    errorElement?: JSX.Element;
    path: string;
    showOnlyOnMenu: boolean;
};

export type {
    AvailableType,
    OrderType,
    ReviewType,
    RouteConfig,
    UserContextType,
    UserInfoType,
    UserProviderType,
};
