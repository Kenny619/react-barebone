import type icons from "./icons";
const Svg = ({
	icon,
	title,
	width = 24,
	height = 24,
}: {
	icon: keyof typeof icons;
	title: string;
	width?: number;
	height?: number;
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-5 w-5"
			fill="none"
			viewBox={`0 0 ${width} ${height}`}
			stroke="currentColor"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1"
				d={icon}
			/>
		</svg>
	);
};

export default Svg;
