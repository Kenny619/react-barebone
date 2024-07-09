import { useState, useContext } from "react";
import { globalContext } from "../../states/globalContext";
import SideNav from "./sideNav";

const NavDrawer = () => {
 
    const context = useContext(globalContext);
<div className="drawer">
	<input id="navDrawer" type="checkbox" className="drawer-toggle" />
	<div className="drawer-content flex flex-col">
		{/* Navbar */}
		<div className="navbar bg-base-300 w-full">
			<div className="flex-none lg:hidden">
				<label
					htmlFor="navDrawer"
					aria-label="open sidebar"
					className="btn btn-square btn-ghost"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block h-6 w-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
			</div>
	<div className="drawer-side">
		<label
			htmlFor="navDrawer"
			aria-label="close sidebar"
			className="drawer-overlay"
		>
 <SideNav />
 </label>
	</div>
</div>
</div>
};

export default NavDrawer;