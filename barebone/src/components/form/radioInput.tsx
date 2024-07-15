const RadioInput = ({
	choices,
	label,
	onChange,
}: {
	choices: string[];
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className="form-control" key={label}>
			{choices.map((choice) => (
				<label className="label cursor-pointer" htmlFor={choice} key={choice}>
					<span className="label-text">{choice}</span>
					<input
						type="radio"
						className="radio-md"
						name={label}
						id={choice}
						value={choice}
						onChange={onChange}
					/>
				</label>
			))}
		</div>
	);
};

export default RadioInput;
