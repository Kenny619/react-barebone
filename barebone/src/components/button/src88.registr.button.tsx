const RegistrButton = ({
	name,
	onClick,
}: { name: string; onClick: () => void }) => {
	return (
		<div className="w-full my-8 flex justify-center">
			<button
				type="button"
				className=" btn btn-block bg-green-500 hover:bg-green-500/90 text-white font-bold rounded-sm"
				onClick={onClick}
			>
				Register new scraper "{name}"
			</button>
		</div>
	);
};

export default RegistrButton;
