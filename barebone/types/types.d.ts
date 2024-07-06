//Toast

type ToastProps = {
	toastId: number;
	close: boolean;
	customButton: boolean;
	timer: {
		enabled: boolean;
		remain: number;
	};
	element: Element;
};

// CRUD Table
type tableData = { [key: string]: string | number }[];
type payload = {
	id: number;
	colName: string;
	newVal: string;
	oldVal: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	hooks: { [key: string]: (...args: any) => void };
	backupData?: tableData;
};
