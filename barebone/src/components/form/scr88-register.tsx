import { useState, useEffect } from "react";
import registerObj from "@/config/scr88.register";
import SelectInput from "@/components/form/radioInput";
import TextInput from "@/components/form/textInput";
import ToggleInput from "@/components/form/toggleInput";
import RegistrButton from "@/components/button/src88.registr.button";
import {
	assertText,
	assertSelect,
	assertToggle,
} from "@/helper/types/helper.type";

import {
	renderBadgeClass,
	renderTextInputBottomText,
	renderTextInputColor,
	validateValue,
	textInputOnChange,
	isRegistable,
	registerScraper,
} from "@/components/form/helper.scr88register";

const RegisterTable = () => {
	const [register, setRegister] = useState(registerObj);
	const [registerButton, setRegisterButton] = useState(false);
	const TableRows = [];

	//Check if register button can be displayed
	useEffect(() => {
		setRegisterButton(isRegistable(register));
	}, [register]);

	//Iterate over registerObj and render HTML for each table row
	for (const [key, item] of Object.entries(register)) {
		//skip rendering if an item has a dependency and it's not met
		if (
			"dependency" in item &&
			register[item.dependency?.key as keyof typeof register].value !==
				item.dependency?.value
		) {
			continue;
		}

		//initialize jsx array
		const jsx = [];
		//name column
		jsx.push(
			<td key={`${key}-name`}>
				<strong>
					<span className="text-sm">{key}</span>
				</strong>
				<div className="mt-1">
					<span className="text-xs">{item.label}</span>
				</div>
			</td>,
		);

		//status column
		jsx.push(
			<td key={`${key}-status`}>
				{"validatorApi" in item ? (
					<div className={renderBadgeClass(item.validatorApi.badgeStatus)}>
						<span className="text-xs">{item.validatorApi.badgeStatus}</span>
					</div>
				) : null}
			</td>,
		);

		//input column - text
		if (assertText(item)) {
			jsx.push(
				<td key={`${key}-input`}>
					<TextInput
						label={key}
						placeholder={item.input.placeholder}
						bottomText={renderTextInputBottomText(
							key as keyof RegisterConfig,
							register,
						)}
						color={renderTextInputColor(key as keyof RegisterConfig, register)}
						onBlur={(e) => {
							validateValue(
								e,
								key as keyof RegisterConfig,
								register,
								setRegister,
							);
						}}
						onChange={(e) => {
							textInputOnChange(
								e,
								key as keyof RegisterConfig,
								register,
								setRegister,
							);
						}}
					/>
				</td>,
			);
		}

		//input -select
		if (assertSelect(item)) {
			jsx.push(
				<td key={`${key}-input`}>
					<SelectInput
						choices={item.input.choices}
						label={key}
						onChange={(e) => {
							setRegister({
								...register,
								[key]: { ...item, value: e.target.value },
							});
						}}
					/>
				</td>,
			);
		}

		if (assertToggle(item)) {
			jsx.push(
				<td key={`${key}-input`}>
					<ToggleInput
						label={key}
						defaultChecked={item.input.defaultChecked}
						onChange={(e) => {
							setRegister({
								...register,
								[key]: { ...item, value: e.target.checked },
							});
						}}
					/>
				</td>,
			);
		}

		//Result Column
		jsx.push(
			<td key={`${key}-result`}>
				<span>
					{"validatorApi" in item && item.validatorApi.extracted}
					{"validatorApi" in item && item.validatorApi.errorMsg}
				</span>
			</td>,
		);
		TableRows.push(<tr key={key}>{jsx}</tr>);
	}

	return (
		<div className="w-full">
			<table className="table table-fixed">
				<thead>
					<tr>
						<th className="w-auto">Name</th>
						<th className="w-auto">Status</th>
						<th className="">Input</th>
						<th className="">Result</th>
					</tr>
				</thead>
				<tbody>{TableRows}</tbody>
			</table>
			{registerButton && (
				<div className="p-2 mx-4 my-2 flex justify-center">
					<RegistrButton
						name={register["name" as keyof typeof register].value as string}
						onClick={() => {
							registerScraper(register);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default RegisterTable;
