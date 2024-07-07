import Footer from "../footer/footer";
import Header from "../header/header";
import SideNav from "../sideNav/sideNav";
import ToastsContainer from "../elements/ToastsContainer";

function DefaultLayout(props: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-row">
				<SideNav />
				{props.children}
			</div>
			<Footer />
			<ToastsContainer />
		</div>
	);
}

export default DefaultLayout;
