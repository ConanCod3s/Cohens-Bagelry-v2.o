import { routes } from './Router';
import { RouteConfig } from '../utils/constants/Types';

type PageInfo = {
    path: string;
    showOnlyOnMenu: boolean;
};

export default function getPages(): PageInfo[] {
    const extractPaths = (importedRoute: RouteConfig[]): PageInfo[] => {
        return importedRoute.flatMap((route) => {
            const currentPage = route.path ? [{ path: route.path, showOnlyOnMenu: route.showOnlyOnMenu }] : [];
            const childrenPages = route.children ? extractPaths(route.children) : [];
            return [...currentPage, ...childrenPages];
        });
    };

    return extractPaths(routes);
};
