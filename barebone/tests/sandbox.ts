const ary = [
	{ id: 1, name: "John" },
	{ id: 2, name: "Jane" },
	{ id: 3, name: "Jim" },
];

for (const row of ary) {
	if (row.id === 2) {
		row.name = "Kenny";
		break;
	}
}

console.log(ary);
