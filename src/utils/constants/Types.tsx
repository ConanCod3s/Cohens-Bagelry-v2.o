import { ReactNode } from "react";

// User-related types
type UserInfoType = {
    uid: string | null;
    displayName: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
}

type UserContextType = {
    loggedIn: boolean;
    userInfo: UserInfoType | null;
}

type UserProviderType = {
    children: ReactNode;
}

// Order-related types
type AvailableType = {
    maxQuantity: number;
    type: string;
    value: string;
    label: string;
    quantity: number;
    cost: number;
    weight: number;
}

type OrderType = {
    orderedByUid: string;
    orderStatus: 'Pending' | 'Confirmed' | 'Declined';
    totalQuantity: number;
    costData: {
        cost: number;
        fee: number;
        totalCost: number;
    };
    orderId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    day: string;
    time: string;
    selections: AvailableType[];
}

// Routing-related types
type RouteConfig = {
    path: string;
    element: JSX.Element;
    showOnlyOnMenu: boolean;
    children?: RouteConfig[];
    errorElement?: JSX.Element;
}

export type {
    AvailableType,
    RouteConfig,
    UserInfoType,
    UserContextType,
    UserProviderType,
    OrderType
};
