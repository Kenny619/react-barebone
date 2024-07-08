import { Link } from "react-router-dom";

const NavParent = ({
	parent,
	children,
}: { parent: string; children: navSingle[] }) => {
	return (
		<>
			<h2 className="menu-title">{parent}</h2>
			<ul>
				{children.map((child) => (
					<li className="menu-item w-full px-4" key={child.path}>
						<Link to={child.path}>
							{child.icon && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>{child.linkText}</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d={child.icon}
									/>
								</svg>
							)}
							{child.linkText}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default NavParent;
