//import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layouts/defaultLayout.tsx";

function Layout(props: { children: React.ReactNode }) {
	return (
		<>
			<DefaultLayout>{props.children}</DefaultLayout>
		</>
	);
}

export default Layout;
