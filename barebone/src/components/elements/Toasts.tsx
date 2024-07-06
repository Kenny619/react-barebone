import { useContext } from "react";
import { globalContext } from "../../states/globalContext.tsx";

/*
type ToastProps = {
   toastId: number;
   close: boolean;
   customButton: boolean;
   timer: {
    enabled: boolean;
    remain: number;
   };
element: string;
}
*/
export const Toasts = () => {
	const context = useContext(globalContext);
	const toasts = context.toasts;
	return context.toasts.length > 0 ? (
		<div className="toast toast-start">{toasts}</div>
	) : (
		<></>
	);
};
