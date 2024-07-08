import { Link } from "react-router-dom";

const isParentChild = (prop: navSingle | navParent): prop is navSingle => {
	return "path" in prop;
};

const isSubmenu = (prop: navSingle | navParent): prop is navParent => {
	return "parent" in prop;
};

const parentChild = ({ children }: { children: navSingle[] }) => {
	return (
		<>
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
		</>
	);
};

const submenu = ({
	parent,
	children,
}: { parent: string; children: navSingle[] }) => {
	return (
		<>
			<a>{parent}</a>
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

const NavSubmenu = ({
	parent,
	children,
}: { parent: string; children: Array<navSingle | navParent> }) => {
	const menu = [<a key={parent}>{parent}</a>];
	for (const child of children) {
		if (isParentChild(child)) {
			menu.push(parentChild({ children: [child] }));
		}
		if (isSubmenu(child)) {
			menu.push(submenu({ parent: child.parent, children: child.children }));
		}
	}
	return menu;
};

export default NavSubmenu;
