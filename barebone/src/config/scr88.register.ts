
export const registerObj: RegisterConfig = {
	name: {
		label: "Scraper config name",
		input: {
			method: "text",
			placeholder: "website name",
		},
		value: null,
		validatorApi: {
			badgeStatus: "Pending Input",
			errorMsg: null,
			apiEndPoint: "/name",
			extracted: null,
		}
	},

	rootUrl: {
		label: "Target site FQDN",
		input: {
			method: "text",
			placeholder: "https://example.com",
		},
		value: null,
		preValidation: ["url"],
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
		},
		value: null,
		preValidation: ["url"],
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
		child: {
			links: {
				label: "CSS link selector for links on the index page.",
				input: {
					method: "text",
					placeholder: "div.link.a",
				},
				value: null,
				preValidation: ["entryUrl"],
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/indexlinks",
					extracted: null,
				},
			},
			multiple: {
				label: "CSS selector for article blocks",
				input: {
					method: "text",
					placeholder: "article.p",
				},
				value: null,
				preValidation: ["entryUrl"],
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/nodes",
					extracted: null,
				},
			},
		},
	},
	nextPageType: {
		label: "Next page URL source",
		input: {
			method: "select",
			choices: ["last", "parameter", "url", "next", "pagenation"],
		},
		value: null,
		child: {
			last: {
				label: "CSS link selector of last URL",
				input: {
					method: "text",
					placeholder: "div.last",
				},
				value: null,
				preValidation: ["entryUrl"],
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/lasturl",
					extracted: null,
				},
				child: {
					lastPageNumberRegExp: {
						label: "Last URL pageNumber RegExp",
						input: {
							method: "text",
							placeholder: "\\/\\d{1,3}",
						},
						value: null,
						preValidation: ["lastUrl"],
						validatorApi: {
							badgeStatus: "Pending Input",
							errorMsg: null,
							apiEndPoint: "/lasturlregex",
							extracted: null,
						},
					},
				},
			},

			parameter: {
				label: "URL parameter name for page number",
				input: {
					method: "text",
					placeholder: "page",
				},
				value: null,
				preValidation: ["entryUrl"],
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/parameter",
					extracted: null,
				},
			},

			next: {
				label: "CSS selector for acquiring the next page URL",
				input: {
					method: "text",
					placeholder: "div.next",
				},
				value: null,
				preValidation: ["entryUrl"],
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/link",
					extracted: null,
				},
			},

			url: {
				label: "Regex for acquiring the page number within the URL",
				input: {
					method: "text",
					placeholder: "\\/(\\d{1,3})\\/",
				},
				value: null,
				preValidation: ["entryUrl"],
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/nexturlregex",
					extracted: null,
				},
			},
		},
	},
	tagFiltering: {
		label: "Enable to scrape articles that match the tags",
		input: {
			method: "toggle",
			defaultChecked: false,
		},
		value: false,
		child: {
			tags: {
				label: "Provide tags for tag filtering.",
				input: {
					method: "text",
					placeholder: "tag1,tag2,tag3",
				},
				value: null,
				preValidation: null,
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: null,
					extracted: null,
				},
			},
		},
	},
	tagCollect: {
		label: "Enable to scrape article tags",
		input: {
			method: "toggle",
			defaultChecked: false,
		},
		value: false,
		child: {
			articleTagSelector: {
				label: "CSS selector for article tags",
				input: {
					method: "text",
					placeholder: "span.tag",
				},
				value: null,
				validatorApi: {
					badgeStatus: "Pending Input",
					errorMsg: null,
					apiEndPoint: "/text",
					extracted: null,
				},
			},
		},
	},
	articleTitleSelector: {
		label: "CSS selector for article title",
		input: {
			method: "text",
			placeholder: "h1.title",
		},
		value: null,
		preValidation: ["entryUrl"],
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
		},
		value: null,
		preValidation: ["entryUrl"],
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
