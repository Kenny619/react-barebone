import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GlobalContextProvider } from "./states/globalContext";

import router from "./router/createBrowserRouter";
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalContextProvider>
			<RouterProvider router={router} />
		</GlobalContextProvider>
	</React.StrictMode>,
);
