const Header = () => {
	return (
		<div className="navbar min-h-14 p-2 bg-slate-900 w-full h-auto flex flex-row">
			<div className="sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
				<button
					className="md:hidden lg:hidden xl:hidden 2xl:hidden btn btn-square btn-ghost"
					type="button"
					aria-label="Menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-5 h-5 stroke-current"
					>
						<title>Menu Icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
			<div className="flex-1">
				<a className="btn btn-ghost text-xl" href="/">
					daisyUI
				</a>
			</div>
			<div className="flex-none gap-2 px-4">
				<div className="form-control">
					<input
						type="text"
						placeholder="Search"
						className=" input input-bordered w-24 md:w-auto"
					/>
				</div>
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
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Header;
