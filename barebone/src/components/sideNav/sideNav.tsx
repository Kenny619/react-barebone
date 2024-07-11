import { Link } from "react-router-dom";
import type icons from "../../assets/icons/svg";
import Svg from "../../assets/icons/svg";
import sideNavConfig from "../../config/menu.sideNav";
import {
	assertNavSingle,
	assertNavParent,
} from "../../helper/types/helper.type";

function SingleBlock(page: navSingle) {
	return (
		<>
			<li className="menu-item m-2 w-full pr-4 min-w-[140px]">
				<Link to={page.path}>
					{page.icon && (
						<Svg
							icon={page.icon as keyof typeof icons}
							title={page.linkText as string}
						/>
					)}
					{page.linkText}
				</Link>
			</li>
		</>
	);
}

function ParentBlock(page: navParent) {
	return (
		<>
			<h2 className="menu-title">{page.parent}</h2>
			<ul>
				{page.children.map((child) => (
					<SingleBlock {...child} key={child.path} />
				))}
			</ul>
		</>
	);
}

function SideNav() {
	return (
		<ul className="menu p-2 m-0 bg-base-100 w-fit h-lvh">
			<nav>
				{sideNavConfig.pages.map((page) =>
					assertNavSingle(page) ? (
						<SingleBlock {...page} key={page.path} />
					) : assertNavParent(page) ? (
						<ParentBlock {...page} key={page.parent} />
					) : null,
				)}
			</nav>
		</ul>
	);
}

export default SideNav;
