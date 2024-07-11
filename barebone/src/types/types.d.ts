//sideNav
//https://daisyui.com/components/menu/
type navSingle = {
	path: string;
	component: React.ReactNode;
	linkText?: string;
	icon?: string;
};

type navParent = {
	parent: string;
	children: navSingle[];
};

type navSubmenu = {
	parent: string;
	children: Array<navParent | navSingle>;
};

type navMenu =
	| {
			type: "single";
			pages: navSingle[];
	  }
	| {
			type: "parent";
			pages: navParent[];
	  }
	| {
			type: "submenu";
			pages: navSubmenu[];
	  };

//Toast

type ToastProps = {
	toastId: number;
	type: "success" | "error" | "info" | "warning" | "default";
	closeButton: boolean;
	timer: {
		enabled: boolean;
		remain: number;
	};
	text: string | null;
	element: React.ReactNode | null;
};

// CRUD Table
type tableData = { [key: string]: string | number }[];
type payload = {
	crudId: number;
	mode: mode;
	id: number;
	colName: string;
	newVal: string;
	oldVal: string;
};

type mode =
	| "create"
	| "update"
	| "delete"
	| "undoCreate"
	| "undoUpdate"
	| "undoDelete";
type Context = null | singleColumnCRUDTableContext;

type singleColumnCRUDTableContext = {
	crudId: number;
	setCrudId: React.Dispatch<React.SetStateAction<number>>;
	tableData: tableData;
	dispatch: React.Dispatch<mode>;
	editId: number;
	setEditId: React.Dispatch<React.SetStateAction<number>>;
	textInput: string;
	setTextInput: React.Dispatch<React.SetStateAction<string>>;
	showToast: boolean;
	setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
	toastElements: never[];
	setToastElements: React.Dispatch<React.SetStateAction<never[]>>;
	crudQueue: payload[];
	setCrudQueue: React.Dispatch<React.SetStateAction<payload[]>>;
	tableDataRef: React.MutableRefObject<tableData>;
};
