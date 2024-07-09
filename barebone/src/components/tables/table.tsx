import React from "react";

const res = await fetch("https://dummyjson.com/posts");
const data = await res.json();
const posts: {
	id: number;
	title: string;
	body: string;
	tags: string[];
	views: number;
}[] = data.posts.map(
	(post: {
		id: number;
		title: string;
		body: string;
		tags: string[];
		views: number;
	}) => ({
		id: post.id,
		title: post.title,
		body: post.body,
		tags: post.tags,
		views: post.views,
	}),
);
//columns to be displayed
const columnNames = ["id", "status", "title", "tags", "control"];

export const Table = () => {
	return (
		<div className="mx-2 my-12 p-2 w-full bg-slate-600">
			<div className="overflow-x-auto">
				<table className="table table-pin-rows">
					{/* head */}
					<thead>
						<tr>
							{columnNames.map((columnName) => (
								<td key={columnName}>{columnName}</td>
							))}
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{posts.map((post) => (
							<tr key={post.id}>
								{columnNames.map((col) => (
									<td key={`${post.id}-${col}`}>
										{col === "status" && post.views % 10 === 0 ? (
											<div className="badge badge-outline badge-success">
												Passed
											</div>
										) : col === "status" && post.views % 2 === 0 ? (
											<div className="badge badge-outline badge-error">
												Failed
											</div>
										) : (
											col === "status" && (
												<div className="badge badge-outline badge-ghost">
													Pending
												</div>
											)
										)}
										{col === "control" && (
											<div className="btn btn-sm rounded-sm  btn-info">
												Review
											</div>
										)}
										{col === "tags" && <div>{post.tags.join(", ")}</div>}
										{col !== "status" &&
											col !== "control" &&
											col !== "tags" && (
												<div>{post[col as keyof typeof post]}</div>
											)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
