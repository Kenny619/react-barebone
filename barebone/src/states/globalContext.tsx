import { createContext, useState, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let globalStates: any = {};
const globalContext = createContext(globalStates);

function GlobalContextProvider({ children }: { children: React.ReactNode }) {
	//////////////////////////refs
	const toastTimeoutSecRef = useRef(3000); //toast timeout in miliseconds

	//////////////////////////states

	//toast management
	//stores active toast objects in an array
	const [toasts, setToasts] = useState([]);

	globalStates = { toasts, setToasts, toastTimeoutSecRef };

	return (
		<globalContext.Provider value={globalStates}>
			{children}
		</globalContext.Provider>
	);
}

export { globalContext, GlobalContextProvider };
