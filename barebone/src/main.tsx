import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import sideNavConfig from "./config/menu.sideNav";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import ErrorPage from "./router/errorPage";
import { GlobalContextProvider } from "./states/globalContext";
import DefaultLayout from "./components/layouts/defaultLayout";

import router from "./router/createBrowserRouter";
// const routerChildren = sideNavConfig.pages
// 	.filter((item) => "path" in item)
// 	.map((item): { path: string; element: React.ReactNode } => {
// 		return {
// 			path: (item as navSingle).path,
// 			element: (item as navSingle).component,
// 		};
// 	});

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <DefaultLayout />,
// 		errorElement: <ErrorPage />,
// 		children: routerChildren,
// 	},
// ]);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalContextProvider>
			<RouterProvider router={router} />
		</GlobalContextProvider>
	</React.StrictMode>,
);
