import { useContext } from "react";
import { globalContext } from "../states/globalContext";
import Title from "../components/elements/TitleText";
import LeadText from "../components/elements/LeadText";

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

function ToastButton() {
	const { toasts, setToasts, toastId, setToastId } = useContext(globalContext);

	return (
		<div className="my-4 mx-2 p-2 ">
			<button
				type="button"
				className="btn btn-info rounded-sm"
				onClick={() => {
					setToastId(toastId + 1);
					setToasts([
						...toasts,
						{
							type: "info",
							toastId: toastId,
							closeButton: true,
							text: `test toast ${toastId}`,
							timer: {
								enabled: true,
								remain: 100,
							},
							message: `test toast ${toastId}`,
							element: null,
						},
					]);
				}}
			>
				Create Toast
			</button>
		</div>
	);
}

export default ToastButton;
