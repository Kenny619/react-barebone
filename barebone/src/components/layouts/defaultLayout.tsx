import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import SideNav from "../sideNav/sideNav";
import ToastsContainer from "../elements/ToastsContainer";

function DefaultLayout() {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-row">
				<SideNav />
				<Outlet />
			</div>
			<Footer />
			<ToastsContainer />
		</div>
	);
}

export default DefaultLayout;
