import Test from "../pages/testTop";
import Toast from "../pages/toastButton";
import Crud from "../pages/crudTable";
import ArticleLists from "../pages/articleLists";
import RegisterTable from "../components/form/scr88-register";

const sideNavConfig: navMenu = {
	type: "parent",

	pages: [
		{
			parent: "",
			children: [
				{
					path: "/",
					linkText: "Home",
					component: <Test />,
					icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
				},
				{
					path: "/toast",
					linkText: "Toast",
					component: <Toast />,
					icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
				},
				{
					path: "/crud",
					component: <Crud />,
					linkText: "CRUD",
					icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
				},
				{
					path: "/articleLists",
					component: <ArticleLists />,
					linkText: "Review",
					icon: "M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z",
				},
			],
		},
		{
			parent: "Scraper",
			children: [
				{
					path: "/register",
					component: <RegisterTable />,
					linkText: "Register",
				},
			],
		},
	],
};

export default sideNavConfig;
