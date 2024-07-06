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
