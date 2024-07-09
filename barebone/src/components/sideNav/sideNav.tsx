import sideNavConfig from "../../pageMenu";
import NavSingle from "./navSingle";
import NavParent from "./navParent";
import NavSubmenu from "./navSubmenu";

function SideNav() {
	return (
		<ul className="menu p-2 m-0 bg-base-100 w-fit h-lvh">
			<nav>
				{sideNavConfig.type === "single" &&
					sideNavConfig.pages.map((page) => (
						<NavSingle {...page} key={page.path} />
					))}
				{sideNavConfig.type === "parent" &&
					sideNavConfig.pages.map((page) => (
						<NavParent {...page} key={page.parent} />
					))}
				{sideNavConfig.type === "submenu" &&
					sideNavConfig.pages.map((page) => (
						<NavSubmenu {...page} key={page.parent} />
					))}
			</nav>
		</ul>
	);
}

export default SideNav;
