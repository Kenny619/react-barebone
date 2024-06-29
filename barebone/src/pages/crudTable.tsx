import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

//fetch data
const res = await fetch("https://dummyjson.com/recipes");
const data = await res.json();
const recipes = data.recipes;

//columns to be displayed
const columns = ["id", "name"];
const controlName = "control";
columns.push(controlName);

const TextInput = (props: {
	id: number;
	colName: string;
	defaultVal: string;
	tableData: { [key: string]: string | number }[];
	setTableData: (data: { [key: string]: string | number }) => void;
	setEditId: (id: number) => void;
}) => {
	//edited string
	const [input, setInput] = useState(props.defaultVal);
	return (
		<input
			type="text"
			value={input}
			className="w-full p-2 bg-slate-100 text-slate-700"
			onChange={(e) => setInput(e.target.value)}
			onBlur={() =>
				SaveUpdate(
					{ id: props.id, colName: props.colName, val: input },
					props.tableData,
					props.setTableData,
					props.setEditId,
				)
			}
		/>
	);
};

const SaveUpdate = (
	edited: { id: number; colName: string; val: string },
	tableData: { [key: string]: string | number }[],
	setTableData: (data: { [key: string]: string | number }) => void,
	setEditId: (id: number) => void,
) => {
	//apply new value to the tableData
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const newTableData = tableData.reduce((acc: any, row) => {
		row[edited.colName] =
			row.id === edited.id ? edited.val : row[edited.colName];
		acc.push(row);
		return acc;
	}, []);

	setTableData(newTableData);
	setEditId(0);
};

const DeleteEntry = (
	id: number,
	tableData: { [key: string]: string | number }[],
	setTableData: (data: { [key: string]: string | number }[]) => void,
) => {
	const newTableData = tableData.filter((row) => row.id !== id);
	setTableData(newTableData);
};

const CrudTable = () => {
	//store the data into a state
	const [tableData, setTableData] = useState(recipes);

	const [toast, setToast] = useState({
		mode: null,
		originalRow: {} as { [key: string]: string | number },
		edited: { colName: "", val: "" },
	});

	const Toast = () => {
		return (
			<div className="toast toast-bottom toast-start">
				<div className="alert alert-success">
					{toast.mode === "edit"
						? `Updated ${toast.edited.colName} from ${toast.originalRow[toast.edited.colName]} to ${toast.edited.val}`
						: `Deleted row with id ${toast.originalRow.id}`}
				</div>
			</div>
		);
	};

	//edit mode
	const [editId, setEditId] = useState(0);

	return (
		<>
			<h1 className="text-2xl font-bold m-8">Repatroire</h1>

			{/*-- new entry --*/}

			<div className="w-full overflow-x-auto">
				<table className="table m-2 p-2 bg-gray-600 rounded-none">
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
											<td key={`${recipes.id}-${col}`}>
												<button
													onClick={() => setEditId(recipe.id as number)}
													type="button"
													className="px-2 text-yellow-300"
												>
													{editId === 0 && (
														<FontAwesomeIcon icon={["fas", "pen"]} />
													)}
												</button>
												<button type="button" className="px-2 text-red-300">
													<FontAwesomeIcon icon={["fas", "trash"]} />
												</button>
											</td>
										);
									}
									return col !== "id" && recipe.id === editId ? (
										<td key={col} className="w-auto">
											<TextInput
												id={recipe.id as number}
												colName={col}
												defaultVal={recipe[col] as string}
												tableData={tableData}
												setTableData={setTableData}
												setEditId={setEditId}
											/>
										</td>
									) : (
										<td key={col} className="w-auto">
											{recipe[col]}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{toast.mode && <Toast />}
		</>
	);
};

export default CrudTable;
