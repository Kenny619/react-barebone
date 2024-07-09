import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav>
			<div className="navbar min-h-16 p-2 bg-slate-900 w-full h-auto flex flex-row">
				<div className="flex-none md:hidden lg:hidden xl:hidden 2xl:hidden">
					<label
						htmlFor="nav-drawer"
						aria-label="open sidebar"
						className="btn btn-square btn-ghost"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block h-6 w-6 stroke-current"
						>
							<title>Menu Icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</label>
				</div>

				<div className="flex-1">
					<Link className="btn btn-ghost text-xl" to="/">
						Scr88
					</Link>
				</div>

				<div className="flex-none">
					<button
						className="btn btn-square btn-ghost"
						type="button"
						aria-label="More options"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block w-5 h-5 stroke-current"
							aria-hidden="true"
						>
							<title>More Menu</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 1-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Header;
