const TextInput = ({
	label,
	placeholder = "",
	bottomText = "",
	color = "",
}: {
	label: string;
	placeholder: string;
	bottomText: string;
	color: string;
}) => {
	return (
		<>
			<label className="form-control w-full max-w-xs" htmlFor={label}>
				<input
					type="text"
					placeholder={placeholder}
					className={`input input-bordered w-full max-w-xsl ${color}`}
					id={label}
					name={label}
				/>
				<div className="label">
					<span className="label-text-alt">{bottomText}</span>
				</div>
			</label>
		</>
	);
};

export default TextInput;
