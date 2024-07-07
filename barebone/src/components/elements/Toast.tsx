import { useContext } from "react";
import { globalContext } from "../../states/globalContext";

/*

type ToastProps = {
	toastId: number;
	closeButton: boolean;
	timer: {
		enabled: boolean;
		remain: number;
	};
	text: string | null;
	element: Element | null;
};
*/
const Toast = ({ toastProp }: { toastProp: ToastProps }) => {
	const { setToasts } = useContext(globalContext);
	return (
		<div
			key={toastProp.toastId}
			className="my-1 mx-2 p-0 w-fit min-w-[300px] rounded-sm bg-slate-300 text-slate-900 h-auto shadow-white shadow-sm"
		>
			{toastProp.element && toastProp.element}
			{toastProp.text && (
				<span className="m-2 text-slate-800 text-sm">{toastProp.text}</span>
			)}
			{toastProp.closeButton && (
				<button
					type="button"
					className="btn btn-sm btn-circle btn-ghost"
					onClick={() => {
						setToasts((toasts: ToastProps[]) =>
							toasts.filter((t) => t.toastId !== toastProp.toastId),
						);
					}}
				>
					✕
				</button>
			)}
			{toastProp.timer.enabled && (
				<progress
					className="block progress  w-full h-2 mx-0 my-0 p-0"
					value={toastProp.timer.remain}
					max="100"
				/>
			)}
		</div>
	);
};

export default Toast;
