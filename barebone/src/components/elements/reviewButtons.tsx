import { Link } from "react-router-dom";

const ReviewButton = () => {
	return (
		<>
			<div className="flex flex-col w-full">
				<div className="join m-2 p-2">
					<button
						type="button"
						className="w-1/2 btn  btn-success join-item rounded-sm"
					>
						Accept
					</button>
					<button
						type="button"
						className="w-1/2 btn btn-error join-item rounded-sm"
					>
						Reject
					</button>
				</div>
			</div>

			<div className="m-2 p-2 text-center">
				<Link className="link" to="/review">
					Skip
				</Link>
			</div>
		</>
	);
};

export default ReviewButton;
