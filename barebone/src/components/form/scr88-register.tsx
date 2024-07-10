import React from "react";
import { registerObj } from "../../config/scr88.register";
import SelectInput from "../../components/form/radioInput";
import TextInput from "../../components/form/textInput";
import ToggleInput from "../../components/form/toggleInput";

function assertText(
	value: RegisterConfig[keyof RegisterConfig],
): value is BaseInput & TextInput {
	return value.input.method === "text";
}

function assertSelect(
	value: RegisterConfig[keyof RegisterConfig],
): value is
	| (BaseInput & SelectInput)
	| (BaseInput & SelectInput & (SiteTypeChild | NextPageTypeChild)) {
	return value.input.method === "select";
}

function assertToggle(
	value: RegisterConfig[keyof RegisterConfig],
): value is BaseInput & ToggleInput & (TagCollectChild | TagFilteringChild) {
	return value.input.method === "toggle";
}

const RegisterTable = () => {
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Input</th>
						<th>Result</th>
					</tr>
					{Object.entries(registerObj).map(
						([key, value]: [string, RegisterConfig[keyof RegisterConfig]]) => (
							<tr key={key}>
								<td>{key}</td>
								<td key={`${key}-status`}>
									{"validatorApi" in value
										? value.validatorApi.badgeStatus
										: null}
								</td>
								<td key={`${key}-input`}>
									{assertText(value) && (
										<TextInput
											label={key}
											placeholder={value.input.placeholder}
											bottomText={value.validatorApi.errorMsg ?? ""}
											color={""}
										/>
									)}
									{assertSelect(value) && (
										<SelectInput choices={value.input.choices} label={key} />
									)}
									{assertToggle(value) && (
										<ToggleInput
											label={key}
											defaultChecked={value.input.defaultChecked}
										/>
									)}
								</td>
								<td key={`${key}-result`}>
									{"validatorApi" in value
										? value.validatorApi.extracted
										: null}
								</td>
							</tr>
						),
					)}
				</thead>
			</table>
		</div>
	);
};

export default RegisterTable;
