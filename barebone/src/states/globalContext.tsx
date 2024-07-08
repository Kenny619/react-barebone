import { createContext, useState, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let globalStates: any = {};
const globalContext = createContext(globalStates);

function GlobalContextProvider({ children }: { children: React.ReactNode }) {
	//////////////////////////refs
	const toastTimeoutSecRef = useRef(4000); //toast timeout in miliseconds

	//////////////////////////states

	//toast management
	//stores active toast objects in an array
	const [toastId, setToastId] = useState(0);
	const [toasts, setToasts] = useState([] as ToastProps[]);

	globalStates = { toasts, setToasts, toastTimeoutSecRef, toastId, setToastId };

	return (
		<globalContext.Provider value={globalStates}>
			{children}
		</globalContext.Provider>
	);
}

export { globalContext, GlobalContextProvider };
