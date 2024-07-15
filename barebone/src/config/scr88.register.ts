
async function getSiteCategory() {
	try {
		const names = await fetch("http://localhost:3333/category/names", {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const namesJson = await names.json();

		console.log(namesJson);
		return namesJson;

	} catch (_) {
		return [] as string[];
	}
}


const siteCategory = await getSiteCategory();

const registerObj: RegisterConfig = {
	name: {
		label: "Scraper config name",
		input: {
			method: "text",
			placeholder: "website name",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/name",
			extracted: null,
		}
	},
	category: {
		label: "Site category",
		input: {
			method: "select",
			choices: siteCategory,
		},
		value: null,
	},

	rootUrl: {
		label: "Target site FQDN",
		input: {
			method: "text",
			placeholder: "https://example.com",
			type: "url",
			typeCheckResult: null,
		},
		value: null,
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/url",
			extracted: null,
		},
	},

	entryUrl: {
		label: "Target site entry point URL",
		input: {
			method: "text",
			placeholder: "https://example.com/entry",
			type: "url",
			typeCheckResult: null,
		},
		value: null,
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/url",
			extracted: null,
		},
	},

	language: {
		label: "Target site language JP or EN",
		input: { method: "select", choices: ["JP", "EN"] },
		value: null,
	},

	siteType: {
		label: "Target site page structure",
		input: {
			method: "select",
			choices: ["links", "single", "multiple"],
		},
		value: null,
	},
	links: {
		label: "CSS link selector for links on the index page.",
		input: {
			method: "text",
			placeholder: "div.link.a",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/indexlinks",
			extracted: null,
		},
		dependency: {
			key: "siteType",
			value: "links",
		},
	},
	multiple: {
		label: "CSS selector for article blocks",
		input: {
			method: "text",
			placeholder: "article.p",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/nodes",
			extracted: null,
		},
		dependency: {
			key: "siteType",
			value: "multiple",
		},
	},

	nextPageType: {
		label: "Next page URL source",
		input: {
			method: "select",
			choices: ["last", "parameter", "url", "next", "pagenation"],
		},
		value: null,
	},

	last: {
		label: "CSS link selector of last URL",
		input: {
			method: "text",
			placeholder: "div.last",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/lasturl",
			extracted: null,
		},
		dependency: {
			key: "nextPageType",
			value: "last",
		},
	},
	lastPageNumberRegExp: {
		label: "Last URL pageNumber RegExp",
		input: {
			method: "text",
			placeholder: "\\/\\d{1,3}",
			type: "regex",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["last"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/lasturlregex",
			extracted: null,
		},
		dependency: {
			key: "nextPageType",
			value: "last",
		},
	},

	parameter: {
		label: "URL parameter name for page number",
		input: {
			method: "text",
			placeholder: "page",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/parameter",
			extracted: null,
		},
		dependency: {
			key: "nextPageType",
			value: "parameter",
		},
	},

	next: {
		label: "CSS selector for acquiring the next page URL",
		input: {
			method: "text",
			placeholder: "div.next",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/link",
			extracted: null,
		},
		dependency: {
			key: "nextPageType",
			value: "next",
		},
	},

	url: {
		label: "Regex for acquiring the page number within the URL",
		input: {
			method: "text",
			placeholder: "\\/(\\d{1,3})\\/",
			type: "regex",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/nexturlregex",
			extracted: null,
		},
		dependency: {
			key: "nextPageType",
			value: "url",
		},
	},
	tagFiltering: {
		label: "Enable to scrape articles that match the tags",
		input: {
			method: "toggle",
			defaultChecked: false,
		},
		value: false,
	},
	tags: {
		label: "Provide tags for tag filtering.",
		input: {
			method: "text",
			placeholder: "tag1,tag2,tag3",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: null,
			extracted: null,
		},
		dependency: {
			key: "tagFiltering",
			value: true,
		},
	},
	tagCollect: {
		label: "Enable to scrape article tags",
		input: {
			method: "toggle",
			defaultChecked: false,
		},
		value: false,
	},
	articleTagSelector: {
		label: "CSS selector for article tags",
		input: {
			method: "text",
			placeholder: "span.tag",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/text",
			extracted: null,
		},
		requirement: ["entryUrl"],
		dependency: {
			key: "tagCollect",
			value: true,
		},
	},

	articleTitleSelector: {
		label: "CSS selector for article title",
		input: {
			method: "text",
			placeholder: "h1.title",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/text",
			extracted: null,
		},
	},

	articleBodySelector: {
		label: "CSS selector for article body",
		input: {
			method: "text",
			placeholder: "article.div.main",
			type: "string",
			typeCheckResult: null,
		},
		value: null,
		requirement: ["entryUrl"],
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/text",
			extracted: null,
		},
	},

	frequency: {
		label: "Program running cycle.",
		input: {
			method: "select",
			choices: ["daily", "weekly", "monthly"],
		},
		value: null,
	},
};

export default registerObj;