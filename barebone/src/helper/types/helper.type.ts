export function assertNavSingle(
	item: navSingle | navParent | navSubmenu,
): item is navSingle {
	return "path" in item;
}

export function assertNavParent(
	item: navSingle | navParent | navSubmenu,
): item is navParent {
	return "children" in item;
}

//scr88.register
export function assertText(
	value: RegisterConfig[keyof RegisterConfig],
): value is BaseInput & TextInput {
	return value.input.method === "text";
}

export function assertSelect(
	value: RegisterConfig[keyof RegisterConfig],
): value is BaseInput & SelectInput {
	return value.input.method === "select";
}

export function assertToggle(
	value: RegisterConfig[keyof RegisterConfig],
): value is BaseInput & ToggleInput {
	return value.input.method === "toggle";
}
