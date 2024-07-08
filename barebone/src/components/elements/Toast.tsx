import { useContext } from "react";
import { globalContext } from "../../states/globalContext";

const Toast = ({ toastProp }: { toastProp: ToastProps }) => {
	const { setToasts } = useContext(globalContext);

	const style = {
		icon: {
			success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
			error:
				"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
			info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
			warning:
				"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
			default:
				"M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z",
		},
		bgColor: {
			success: "bg-success",
			error: "bg-error",
			info: "bg-info",
			warning: "bg-warning",
			default: "bg-slate-300",
		},
		iconColor: {
			success: "text-green-700",
			error: "text-red-700",
			info: "text-blue-700",
			warning: "text-yellow-700",
			default: "text-slate-900",
		},
	};
	return (
		<div
			key={toastProp.toastId}
			className={` my-1 mx-2 p-0 h-auto min-h-3 w-fit min-w-[300px] rounded-sm ${style.bgColor[toastProp.type]}  shadow-white shadow-sm`}
		>
			{toastProp.element && toastProp.element}

			<div className="flex flex-row">
				<div className="w-fit">
					<svg
						width={24}
						height={24}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 25 25"
						className={`inline-block m-2 stroke-current ${style.iconColor[toastProp.type]}`}
					>
						<title>{toastProp.type}</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={style.icon[toastProp.type]}
						/>
					</svg>
				</div>
				{toastProp.text && (
					<div className="w-full">
						<span className="inline-block m-2 text-slate-800 text-sm">
							{toastProp.text}
						</span>
					</div>
				)}
				{toastProp.closeButton && (
					<div className="w-fit">
						<button
							type="button"
							className="inline-block btn btn-sm btn-circle btn-ghost"
							onClick={() => {
								setToasts((toasts: ToastProps[]) =>
									toasts.filter((t) => t.toastId !== toastProp.toastId),
								);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 26 26"
								className="inline-block stroke-current text-slate-500"
								width={20}
								height={20}
							>
								<title>close</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1"
									d="M6 18 17.94 6M18 18 6.06 6"
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
			{toastProp.timer.enabled && (
				<progress
					className={`block progress ${style.bgColor[toastProp.type]}  w-full h-2 mx-0 my-0 p-0`}
					value={toastProp.timer.remain}
					max="100"
				/>
			)}
		</div>
	);
};

export default Toast;
