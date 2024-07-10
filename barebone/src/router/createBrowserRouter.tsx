import { createBrowserRouter } from "react-router-dom";

import sideNavConfig from "../config/menu.sideNav";
import ErrorPage from "./errorPage";
import DefaultLayout from "../components/layouts/defaultLayout";

const routerChildren = sideNavConfig.pages
	.filter((item) => "path" in item)
	.map((item): { path: string; element: React.ReactNode } => {
		return {
			path: (item as navSingle).path,
			element: (item as navSingle).component,
		};
	});

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		errorElement: <ErrorPage />,
		children: routerChildren,
	},
]);

export default router;
