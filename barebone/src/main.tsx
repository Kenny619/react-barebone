import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import TestTop from "./pages/testTop";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import ErrorPage from "./router/errorPage";

import { GlobalContextProvider } from "./states/globalContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <TestTop />,
		errorElement: <ErrorPage />,
	},
]);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalContextProvider>
			<Layout>
				<RouterProvider router={router} />
			</Layout>
		</GlobalContextProvider>
	</React.StrictMode>,
);
