const ToggleInput = ({
	label,
	defaultChecked = false,
}: { label: string; defaultChecked: boolean }) => {
	return (
		<input
			type="checkbox"
			className="toggle"
			defaultChecked={defaultChecked}
			name={label}
			id={label}
		/>
	);
};

export default ToggleInput;
