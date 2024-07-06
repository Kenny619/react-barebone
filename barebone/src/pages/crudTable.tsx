import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	useState,
	useEffect,
	useRef,
	useReducer,
	createContext,
	useContext,
} from "react";

import TitleText from "../components/elements/TitleText";
import LeadText from "../components/elements/LeadText";

//fetch data
const res = await fetch("https://dummyjson.com/recipes");
const data = await res.json();
const recipes: { [key: string]: string | number }[] = data.recipes;
console.log("recipes loaded");
//columns to be displayed
const columns = ["id", "name"];
const editableColumn = "name";
const controlName = "control";
columns.push(controlName);

//create context
const CRUDtableContext = createContext<Partial<singleColumnCRUDTableContext>>(
	{},
);

const ContextStore = (props: { children: React.ReactNode }) => {
	//manage the state of tableData displayed on the screen
	const [tableData, dispatch] = useReducer(CRUDReducer, recipes);

	//edit mode
	//open text field when id is set
	const [editId, setEditId] = useState(0);

	//reset add entry input to blank
	//const [defaultVal, setDefaultVal] = useState("");
	const [textInput, setTextInput] = useState("");

	//display toast
	const [showToast, setShowToast] = useState(false);

	//manage multiple toasts
	const [toastElements, setToastElements] = useState([]);

	//manage payload of crud actions
	const [crudQueue, setCrudQueue] = useState([] as payload[]);

	//keep track of crudId used in payload
	const [crudId, setCrudId] = useState(0);

	//backup tableData for undoDelete
	const tableDataRef = useRef(tableData);

	//create context parameters
	const contextObj = {
		crudId,
		setCrudId,
		tableData,
		dispatch,
		editId,
		setEditId,
		textInput,
		setTextInput,
		showToast,
		setShowToast,
		toastElements,
		setToastElements,
		tableDataRef,
		crudQueue,
		setCrudQueue,
	};

	return (
		<CRUDtableContext.Provider value={contextObj}>
			{props.children}
		</CRUDtableContext.Provider>
	);
};

function CRUDTable() {
	return (
		<>
			<ContextStore>
				<TitleText title="Repatroire" />
				<LeadText leadText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam eget libero. Nulla facilisi. Duis aliquam turpis nunc, at euismod nunc euismod sit amet. Sed ut diam eget libero. Nulla facilisi. Duis aliquam turpis nunc, at euismod nunc euismod sit amet." />
				<TextInput placeholder="Add new entry" />
				<SingleColumnCRUDTable />
			</ContextStore>
		</>
	);
}

const TextInput = ({ placeholder = "", actionId = 0 }) => {
	//retrieve context
	const context = useContext(CRUDtableContext) as singleColumnCRUDTableContext;

	const [input, setInput] = useState("");

	const payload =
		actionId === 0
			? {
					crudId: context.crudId,
					mode: "create",
					id: Math.max(...context.tableData.map((row) => row.id as number)) + 1,
					colName: editableColumn,
					newVal: "",
					oldVal: "",
				}
			: context.crudQueue.find((payload) => payload.crudId === actionId);

	if (!payload) {
		console.error("payload not found");
		return null;
	}

	return (
		<input
			type="text"
			value={input}
			placeholder={placeholder}
			className="w-full p-2 bg-slate-100 text-slate-700"
			onChange={(e) => setInput(e.target.value)}
			onBlur={() => {
				payload.newVal = input;
				context.setCrudQueue;
				//context.dispatch();
				setInput("");
			}}
		/>
	);
};
const CRUDReducer = (tableData: tableData, mode: mode) => {
	//retrieve context
	const context = useContext(CRUDtableContext) as singleColumnCRUDTableContext;

	switch (mode) {
		case "create": {
			//exit if no value is passed
			if (context.dispatchRef.current.newVal === "") {
				//context.setTextInput("");
				return [...tableData];
			}

			//create new id
			const newId =
				Math.max(...tableData.map((row) => Number.parseInt(row.id as string))) +
				1;
			const newRow: { [key: string]: string | number } = {
				id: newId,
			};
			newRow[context.dispatchRef.current.colName] =
				context.dispatchRef.current.newVal;
			tableData.push(newRow);

			// payload.hooks.setToastPayload({
			// 	mode: "create",
			// 	id: newRow.id,
			// 	colName: "",
			// 	newVal: payload.newVal,
			// 	oldVal: "",
			// });

			//display toast
			context.setShowToast(true);

			return [...tableData];
		}
		case "update": {
			//exit if no changes are made
			if (
				context.dispatchRef.current.oldVal ===
				context.dispatchRef.current.newVal
			) {
				//hide TextInput
				context.setEditId(0);
				return [...tableData];
			}

			for (const row of tableData) {
				if (row.id === context.dispatchRef.current.id) {
					row[context.dispatchRef.current.colName] =
						context.dispatchRef.current.newVal;
					break;
				}
			}
			//hide TextInput
			context.setEditId(0);

			//display toast
			// payload.hooks.setToastPayload({
			// 	mode: "update",
			// 	id: payload.id,
			// 	colName: payload.colName,
			// 	newVal: payload.newVal,
			// 	oldVal: payload.oldVal,
			// });

			//display toast
			context.setShowToast(true);
			return [...tableData];
		}

		case "delete": {
			//display toast
			// context.setToastPayload({
			// 	mode: "delete",
			// 	id: payload.id,
			// 	colName: "",
			// 	newVal: "",
			// 	oldVal: payload.oldVal,
			// 	backup: payload.backupData,
			// });

			//display toast
			context.setShowToast(true);
			return [
				...tableData.filter((row) => row.id !== context.dispatchRef.current.id),
			];
		}

		case "undoCreate": {
			return [
				...tableData.filter((row) => row.id !== context.dispatchRef.current.id),
			];
		}

		case "undoUpdate": {
			for (const row of tableData) {
				if (row.id === context.dispatchRef.current.id) {
					row[context.dispatchRef.current.colName] =
						context.dispatchRef.current.oldVal;
					break;
				}
			}
			return [...tableData];
		}
		case "undoDelete": {
			return [...context.tableDataRef.current];
		}
		default:
			return tableData;
	}
};

function Toast() {
	//retrieve context
	const context = useContext(CRUDtableContext) as singleColumnCRUDTableContext;

	//Progress bar state & ref
	const intervalRef = useRef<number | null>(null);
	const [progress, setProgress] = useState(100);

	/*
	useEffect(() => {
		intervalRef.current = window.setInterval(() => {
			setProgress((prev) => prev - 1);
			if (progress <= 0) {
				setShowToast(false);
				setToastPayload({
					mode: "",
					id: 0,
					colName: "",
					newVal: "",
					oldVal: "",
				});
				clearInterval(intervalRef.current as number);
			}
		}, 30);
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	});
*/
	//message & styles
	const message: Partial<{ [key in mode]: string }> = {
		create: `Added id:${context.dispatchRef.current.id} to the list.`,
		update: `id:${context.dispatchRef.current.id} updated column ${context.dispatchRef.current.colName} from ${context.dispatchRef.current.oldVal} to ${context.dispatchRef.current.newVal}.`,
		delete: `Deleted id:${context.dispatchRef.current.id} "${context.dispatchRef.current.oldVal}"`,
	};

	const style: Partial<{ [key in mode]: string }> = {
		create: "alert-success",
		update: "alert-info",
		delete: "alert-warning",
	};

	const undo: {
		[key in Extract<mode, "create" | "update" | "delete">]: Extract<
			mode,
			"undoCreate" | "undoUpdate" | "undoDelete"
		>;
	} = {
		create: "undoCreate",
		update: "undoUpdate",
		delete: "undoDelete",
	};

	return (
		<div className="toast toast-bottom toast-start text-sm w-fit rounded-sm">
			<div className=" rounded-sm bg-slate-300 text-slate-900 h-auto p-4">
				<div className="flex gap-4 justify-items-center align-middle justify-center">
					<div className="">
						{message[context.dispatchRef.current.mode as keyof typeof message]}
					</div>
					<div className="">
						<button
							type="button"
							className="btn"
							onClick={() =>
								context.dispatch(
									undo[context.dispatchRef.current.mode as keyof typeof undo],
								)
							}
						>
							UNDO
						</button>
					</div>
				</div>
				<div className="w-full m-0 p-0">
					<progress
						className="progress progress-accent w-full h-4 mx-0 mt-4 mb-0"
						value={progress}
						max="100"
					/>
				</div>
			</div>
		</div>
	);
}

function SingleColumnCRUDTable() {
	//retrieve context
	const context = useContext(CRUDtableContext) as singleColumnCRUDTableContext;

	return (
		<>
			<div className="w-fit m-4 ">
				<table className="table bg-gray-600 rounded-none">
					{/* table header */}
					<thead>
						<tr>
							{columns.map((column) => (
								<th key={column}>{column}</th>
							))}
						</tr>
					</thead>

					{/* table body */}
					<tbody>
						{context.tableData.map(
							(recipe: { [key: string]: string | number }) => (
								<tr key={recipe.id} className="hover:bg-gray-500">
									{columns.map((col) => {
										//display control column
										if (col === "control") {
											return (
												<td key={`${recipe.id}-${col}`}>
													{/* display edit button  */}
													<button
														onClick={() =>
															context.setEditId(recipe.id as number)
														}
														type="button"
														className="px-2 text-yellow-300"
													>
														{context.editId === 0 && (
															<FontAwesomeIcon icon={["fas", "pen"]} />
														)}
													</button>

													{/* display delete button  */}
													<button
														onClick={() => {
															context.setCrudQueue([
																...context.crudQueue,
																{
																	mode: "delete",
																	id: recipe.id as number,
																	colName: "",
																	newVal: "",
																	oldVal: recipe[col] as string,
																},
															]);

															context.dispatch("delete");
														}}
														type="button"
														className="px-2 text-red-300"
													>
														<FontAwesomeIcon icon={["fas", "trash"]} />
													</button>
												</td>
											);
										}

										// display TextInput field when edit button is clicked
										if (col !== "id" && recipe.id === context.editId) {
											//push update field info to the crudQueue array
											context.setCrudQueue([
												...context.crudQueue,
												{
													mode: "update",
													id: recipe.id,
													colName: col,
													newVal: "",
													oldVal: recipe[col] as string,
												},
											]);
											return (
												<td key={col} className="w-auto">
													<TextInput />
												</td>
											);
										}

										// display table data
										return (
											<td key={`${recipe.id}-${col}`} className="w-auto">
												{recipe[col]}
											</td>
										);
									})}
								</tr>
							),
						)}
					</tbody>
				</table>
			</div>
			{context.showToast && <Toast />}
		</>
	);
}

export default CRUDTable;
