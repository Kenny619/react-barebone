import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout.tsx";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { GlobalContextProvider } from "./states/globalContext.tsx";
library.add(fas);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalContextProvider>
			<Layout />
		</GlobalContextProvider>
	</React.StrictMode>,
);
