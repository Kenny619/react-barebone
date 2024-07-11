/**
 * Enables Client Side Rendering of pages defined in sideNavConfig
 * ------------------------------------------------------------
 * createBrowserRouter instance from react-router is being created,
 * having an objects of page path and page element defined in
 * sideNavConfig.  This object becomes the value of children property in
 * createBrowserRouter instance and exported to main.tsx where
 * it is fed to RouterProvider.
 */

import { createBrowserRouter } from "react-router-dom";
import sideNavConfig from "../config/menu.sideNav";
import ErrorPage from "./errorPage";
import DefaultLayout from "../components/layouts/defaultLayout";

function assertNavSingle(
	item: navSingle | navParent | navSubmenu,
): item is navSingle {
	return "path" in item;
}

function assertNavParent(
	item: navSingle | navParent | navSubmenu,
): item is navParent {
	return "children" in item;
}

const routerChildren = sideNavConfig.pages.flatMap((item) => {
	//For type=single; return the path and element of each item
	if (assertNavSingle(item)) {
		return {
			path: item.path,
			element: item.component,
		};
	}

	//For type=parent or type=submenu;
	return item.children.map((page) => {
		//For type=parent;  Return path element from each item in the children array
		if (assertNavSingle(page)) {
			return {
				path: page.path,
				element: page.component,
			};
		}

		//For type=submenu; Return path and element from each item in the children array
		if (assertNavParent(page)) {
			return page.children.map((subPage) => {
				return {
					path: subPage.path,
					element: subPage.component,
				};
			});
		}
	});
});

console.log(routerChildren);
// const routerChildren = sideNavConfig.pages
// 	.filter((item) => "path" in item)
// 	.map((item): { path: string; element: React.ReactNode } => {
// 		return {
// 			path: (item as navSingle).path,
// 			element: (item as navSingle).component,
// 		};
// 	});

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		errorElement: <ErrorPage />,
		children: routerChildren,
	},
]);

export default router;
