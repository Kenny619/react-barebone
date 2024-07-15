const TextInput = ({
	label,
	placeholder = "",
	bottomText = "",
	color = "",
	onChange = () => {},
	onBlur = () => {},
}: {
	label: string;
	placeholder: string;
	bottomText: string;
	color: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<>
			<label className="form-control w-full max-w-xs" htmlFor={label}>
				<input
					type="text"
					placeholder={placeholder}
					className={`input input-bordered w-full max-w-xsl text-xs ${color}`}
					id={label}
					name={label}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<div className="label">
					<span className="label-text-alt">{bottomText}</span>
				</div>
			</label>
		</>
	);
};

export default TextInput;
