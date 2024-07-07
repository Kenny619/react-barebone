import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, useReducer } from "react";

//fetch data
const res = await fetch("https://dummyjson.com/recipes");
const data = await res.json();
const recipes: { [key: string]: string | number }[] = data.recipes;
console.log("recipes loaded");
//columns to be displayed
const columns = ["id", "name"];
const controlName = "control";
columns.push(controlName);

/* 

receive input


make action
 create
  id
  value
  whole data
  mode
 update
  id
  new value
  old value
  whole data
  mode
 delete
  id
  old value
  whole data
  mode
 undo create
  id
  whole data
 undo update
  id
  old value
  whole data
 undo delete
  id
  old value
  whole data
show toast

*/

const crudReducer = (
	tableData: tableData,
	{ type, payload }: { type: string; payload: payload },
) => {
	switch (type) {
		case "create": {
			const newRow: { [key: string]: string | number } = {
				id:
					Math.max(
						...tableData.map((row) => Number.parseInt(row.id as string)),
					) + 1,
			};
			newRow[payload.colName] = payload.newVal;
			tableData.push(newRow);

			//display toast
			payload.hooks.setToastPayload({
				mode: "create",
				id: newRow.id,
				colName: "",
				newVal: payload.newVal,
				oldVal: "",
			});
			payload.hooks.setShowToast(true);

			return [...tableData];
		}
		case "update": {
			for (const row of tableData) {
				if (row.id === payload.id) {
					row[payload.colName] = payload.newVal;
					break;
				}
			}
			payload.hooks.setEditId(0);

			//display toast
			payload.hooks.setToastPayload({
				mode: "update",
				id: payload.id,
				colName: payload.colName,
				newVal: payload.newVal,
				oldVal: payload.oldVal,
			});
			payload.hooks.setShowToast(true);
			return [...tableData];
		}

		case "delete": {
			//display toast
			payload.hooks.setToastPayload({
				mode: "delete",
				id: payload.id,
				colName: "",
				newVal: "",
				oldVal: payload.oldVal,
				backup: payload.backupData,
			});
			payload.hooks.setShowToast(true);
			return [...tableData.filter((row) => row.id !== payload.id)];
		}

		case "undoCreate": {
			return [...tableData.filter((row) => row.id !== payload.id)];
		}

		case "undoUpdate": {
			for (const row of tableData) {
				if (row.id === payload.id) {
					row[payload.colName] = payload.oldVal;
					break;
				}
			}
			return [...tableData];
		}
		case "undoDelete": {
			const newRow: { [key: string]: string | number } = {
				id: payload.id,
			};
			newRow[payload.colName] = payload.newVal;
			tableData.push({ id: payload.id });
			return [...tableData.filter((row) => row.id !== payload.id)];
		}
		default:
			return tableData;
	}
};

const TextInput = ({
	mode,
	id,
	colName,
	placeholder,
	defaultVal,
	dispatch,
	hooks,
}: {
	mode: string;
	id: number;
	colName: string;
	placeholder: string;
	defaultVal: string;
	dispatch: (action: { type: string; payload: payload }) => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	hooks: { [key: string]: (...args: any) => void };
}) => {
	//input string state
	const [input, setInput] = useState(defaultVal);

	return (
		<input
			type="text"
			value={input}
			placeholder={placeholder}
			className="w-full p-2 bg-slate-100 text-slate-700"
			onChange={(e) => setInput(e.target.value)}
			onBlur={() => {
				dispatch({
					type: mode,
					payload: {
						id: id,
						colName: colName,
						newVal: input,
						oldVal: defaultVal,
						hooks: hooks,
					},
				});
				setInput("");
			}}
		/>
	);
};

const Toast = ({
	mode,
	id,
	colName,
	newVal,
	oldVal,
	backup = null,
	setShowToast,
	setToastPayload,
}: {
	mode: string;
	id: number;
	colName: string;
	newVal: string;
	oldVal: string;
	backup: tableData | null;
	setShowToast: (showToast: boolean) => void;
	setToastPayload: (toastPayload: {
		mode: string;
		id: number;
		colName: string;
		newVal: string;
		oldVal: string;
	}) => void;
}) => {
	// const timeoutRef = useRef<number | null>(null);
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
	const message = {
		create: `Added id:${id} to the list.`,
		update: `id:${id} updated column ${colName} from ${oldVal} to ${newVal}.`,
		delete: `Deleted id:${id} "${oldVal}"`,
	};

	return (
		<div className="toast toast-bottom toast-start text-sm w-fit rounded-sm">
			<div className=" rounded-sm bg-slate-300 text-slate-900 h-auto p-4">
				<div className="flex gap-4 justify-items-center align-middle justify-center">
					<div className="">{message[mode as keyof typeof message]}</div>
					<div className="">
						<button type="button" className="btn">
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
};

const CrudTable = () => {
	//store the data into a state
	//const [tableData, setTableData] = useState(recipes);

	//CRUD action fn.
	//manage the state of tableData displayed on the screen
	const [tableData, dispatch] = useReducer(crudReducer, recipes);

	//edit mode
	const [editId, setEditId] = useState(0);

	//reset add entry input to blank
	const [defaultVal, setDefaultVal] = useState("");

	//display toast
	const [showToast, setShowToast] = useState(false);
	const [toastPayload, setToastPayload] = useState({
		mode: "",
		id: 0,
		colName: "",
		newVal: "",
		oldVal: "",
	});

	//backup tableData for undoDelete
	const backupTableData = useRef(tableData);

	return (
		<>
			<h1 className="text-2xl font-bold my-8 mx-4">Repatroire</h1>

			{/*-- new entry --*/}
			<div className="w-1/2 m-4">
				<TextInput
					mode="create"
					id={0} //recalculate id in reducer fn
					placeholder="Add new entry"
					colName="name"
					defaultVal={defaultVal}
					dispatch={dispatch}
					hooks={{
						setDefaultVal: setDefaultVal,
						setShowToast: setShowToast,
						setToastPayload: setToastPayload,
					}}
				/>
			</div>

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
						{tableData.map((recipe: { [key: string]: string | number }) => (
							<tr key={recipe.id} className="hover:bg-gray-500">
								{columns.map((col) => {
									if (col === "control") {
										return (
											<td key={`${recipe.id}-${col}`}>
												<button
													onClick={() => setEditId(recipe.id as number)}
													type="button"
													className="px-2 text-yellow-300"
												>
													{editId === 0 && (
														<FontAwesomeIcon icon={["fas", "pen"]} />
													)}
												</button>
												<button
													onClick={() =>
														dispatch({
															type: "delete",
															payload: {
																id: recipe.id as number,
																colName: "",
																newVal: "",
																oldVal: recipe.name as string,
																backupData: backupTableData.current,
																hooks: {
																	setShowToast: setShowToast,
																	setToastPayload: setToastPayload,
																},
															},
														})
													}
													type="button"
													className="px-2 text-red-300"
												>
													<FontAwesomeIcon icon={["fas", "trash"]} />
												</button>
											</td>
										);
									}
									return col !== "id" && recipe.id === editId ? (
										<td key={col} className="w-auto">
											<TextInput
												mode="update"
												id={recipe.id as number}
												placeholder=""
												colName={col}
												defaultVal={recipe[col] as string}
												dispatch={dispatch}
												hooks={{
													setEditId: setEditId,
													setShowToast: setShowToast,
													setToastPayload: setToastPayload,
												}}
											/>
										</td>
									) : (
										<td key={`${recipe.id}-${col}`} className="w-auto">
											{recipe[col]}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showToast && (
				<Toast
					mode={toastPayload.mode}
					id={toastPayload.id}
					colName={toastPayload.colName}
					newVal={toastPayload.newVal}
					oldVal={toastPayload.oldVal}
					setShowToast={setShowToast}
					setToastPayload={setToastPayload}
				/>
			)}
		</>
	);
};

export default CrudTable;
