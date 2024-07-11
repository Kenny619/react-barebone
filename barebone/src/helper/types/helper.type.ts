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
