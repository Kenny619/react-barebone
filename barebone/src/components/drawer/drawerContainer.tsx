import SideNav from "../sideNav/sideNav";

const DrawerContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="drawer">
			<input id="nav-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content m-0 p-0 ">{children}</div>

			<div className="drawer-side">
				<label
					htmlFor="nav-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				/>
				<SideNav />
			</div>
		</div>
	);
};
export default DrawerContainer;
