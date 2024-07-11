import Test from "../pages/testTop";
import Toast from "../pages/toastButton";
import Crud from "../pages/crudTable";
import ArticleLists from "../pages/articleLists";
import RegisterTable from "../components/form/scr88-register";
import icons from "../assets/icons/icons";
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
					icon: icons.home,
				},
				{
					path: "/toast",
					linkText: "Toast",
					component: <Toast />,
					icon: icons.bullhorn,
				},
				{
					path: "/crud",
					component: <Crud />,
					linkText: "CRUD",
					icon: icons.chartMixed,
				},
				{
					path: "/articleLists",
					component: <ArticleLists />,
					linkText: "Review",
					icon: icons.filecheck,
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
					icon: icons.plus,
				},
			],
		},
	],
};

export default sideNavConfig;
