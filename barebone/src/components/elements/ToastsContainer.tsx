import { useContext, useEffect } from "react";
import { globalContext } from "../../states/globalContext.tsx";
import Toast from "./Toast";

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
const ToastsContainer = () => {
	const { toasts, setToasts, toastTimeoutSecRef } = useContext(globalContext);

	const intervalMs = toastTimeoutSecRef.current / 100;
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const intervalId = setInterval(() => {
			setToasts((toasts: ToastProps[]) =>
				toasts
					.map((toast: ToastProps) => ({
						...toast,
						timer: {
							...toast.timer,
							remain: toast.timer.remain > 0 ? toast.timer.remain - 1 : 0,
						},
					}))
					.filter((toast: ToastProps) => toast.timer.remain > 0),
			);
		}, intervalMs);

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [toasts]);

	return toasts.length > 0 ? (
		<div className="toast toast-bottom toast-start my-4 mx-2 p-2">
			{toasts.map((toast: ToastProps) => (
				<Toast key={toast.toastId} toastProp={toast} />
			))}
		</div>
	) : (
		<></>
	);
};

export default ToastsContainer;
