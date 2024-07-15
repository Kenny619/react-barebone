const ToggleInput = ({
	label,
	defaultChecked = false,
	onChange,
}: {
	label: string;
	defaultChecked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<input
			type="checkbox"
			className="toggle toggle-md"
			defaultChecked={defaultChecked}
			name={label}
			id={label}
			onChange={onChange}
		/>
	);
};

export default ToggleInput;
