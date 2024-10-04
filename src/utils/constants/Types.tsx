import { ReactNode } from "react";

type RouteConfig = {
    path: string;
    element: JSX.Element;
    showOnlyOnMenu: boolean;
    children?: RouteConfig[];
    errorElement?: JSX.Element;
}

type UserInfoType = {
    uid: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

type UserContextType = {
    loggedIn: boolean;
    userInfo: UserInfoType | null;
}

type UserProviderType = {
    children: ReactNode;
}

type OrderType = {
    totalQuantity: number;
    totalCost: number;
    orderId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    day: string;
    time: string;
    selections: AvailableType[];
}

type AvailableType = {
    maxQuantity: number;
    type: string;
    value: string;
    label: string;
    quantity: number;
    cost: number;
    weight: number;
}

export type { AvailableType, RouteConfig, UserInfoType, UserContextType, UserProviderType, OrderType };