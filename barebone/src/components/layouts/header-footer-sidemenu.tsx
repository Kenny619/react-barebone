import CrudTable from "../../pages/crudTable";
import Footer from "../footer/footer";
import Header from "../header/header";
import IndexWithImage from "../../pages/indexWithImage";
function LayoutHeaderFooterSideMenu() {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-row">
				<nav className="hidden sm:hidden md:flex w-auto h-full bg-neutral-400">
					sidenav
				</nav>
				<main className="w-full h-full bg-neutral-600">
					{/* <IndexWithImage /> */}
					<CrudTable />
				</main>
			</div>

			<Footer />
		</div>
	);
}

export default LayoutHeaderFooterSideMenu;
