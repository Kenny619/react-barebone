import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import SideNav from "../sideNav/sideNav";
import ToastsContainer from "../elements/ToastsContainer";
import DrawerContainer from "../drawer/drawerContainer";

function DefaultLayout() {
	return (
		<div className="flex flex-col">
			<DrawerContainer>
				<Header />
				<div className="flex flex-row ">
					<div className="hidden md:block">
						<SideNav />
					</div>
					<Outlet />
				</div>
				<Footer />
				<ToastsContainer />
			</DrawerContainer>
		</div>
	);
}

export default DefaultLayout;
