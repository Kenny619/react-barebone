const RadioInput = ({
	choices,
	label,
}: { choices: string[]; label: string }) => {
	return (
		<div className="form-control" key={label}>
			{choices.map((choice) => (
				<label className="label cursor-pointer" htmlFor={choice} key={choice}>
					<span className="label-text">{choice}</span>
					<input type="radio" name={choice} id={choice} />
				</label>
			))}
		</div>
	);
};

export default RadioInput;
