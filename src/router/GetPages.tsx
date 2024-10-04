import { routes } from './Router';
import { RouteConfig } from '../utils/constants/Types';

export default function getPages() {
    const pages: { path: string, showOnlyOnMenu: boolean }[] = [];

    const extractPaths = (importedRoute: RouteConfig[]) => {
        importedRoute.forEach((route: RouteConfig) => {
            if (route.path) pages.push({ path: route.path, showOnlyOnMenu: route.showOnlyOnMenu });
            if (route.children) extractPaths(route.children);
        });
    };

    extractPaths(routes);

    return pages;
};
