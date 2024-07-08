import { Link } from "react-router-dom";

const NavSingle = ({
	path,
	linkText,
	icon,
}: { path: string; linkText?: string; icon?: string }) => {
	return (
		<li className="menu-item m-2 w-full pr-4 min-w-[140px]">
			<Link to={path}>
				{icon && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<title>{linkText}</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={icon}
						/>
					</svg>
				)}
				{linkText}
			</Link>
		</li>
	);
};

export default NavSingle;
