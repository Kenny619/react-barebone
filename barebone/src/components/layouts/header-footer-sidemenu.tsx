import "../../index.css";
import Header from "../header/header";

function LayoutHeaderFooterSideMenu() {
	return (
		<>
			<div className="w-full h-auto m-0 p-0">
				<Header />
				<div className="w-full h-full m-0 p-0 flex flex-row">
					<nav className="w-auto h-full p-2 bg-slate-400">sidenav</nav>
					<main className="w-full h-full p-2 bg-green-500">main</main>
				</div>

				<footer className="w-full h-auto p-2 bg-gray-700 flex-none">
					footer
				</footer>
			</div>
		</>
	);
}

export default LayoutHeaderFooterSideMenu;
