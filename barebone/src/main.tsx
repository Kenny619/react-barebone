import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import TestTop from "./pages/testTop";
import ToastButton from "./pages/toastButton";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import ErrorPage from "./router/errorPage";

import { GlobalContextProvider } from "./states/globalContext";
import CrudTable from "./pages/crudTable";
import DefaultLayout from "./components/layouts/defaultLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <TestTop />,
			},
			{
				path: "toast",
				element: <ToastButton />,
			},
			{
				path: "crud",
				element: <CrudTable />,
			},
		],
	},
]);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalContextProvider>
			<RouterProvider router={router} />
		</GlobalContextProvider>
	</React.StrictMode>,
);
