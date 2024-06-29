import React from "react";

const indexWithImage = () => {
	return (
		<div>
			<div className="w-full h-32 bg-slate-600 mb-10 p-10">
				<h1 className="text-2xl font-bold">Page title</h1>
			</div>

			<article className="flex flex-row  gap-4 w-full p-4 my-4">
				<div className="sm:w-1/3 md:w-1/5 lg:w-1/6 justify-center ">
					<img
						className="w-auto object-cover rounded-sm"
						src="https://placehold.jp/800x600.png"
						alt="placeholder"
					/>
				</div>

				<div className="w-auto flex flex-col">
					<div>
						<h1 className="text-2xl font-bold mb-3">
							This would be the Title of the article
						</h1>
					</div>
					<div className="mb-1">
						<p className="text-sm">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
							quos.
						</p>
					</div>
					<div>
						<div className="badge p-3 m-1">enigma</div>
						<div className="badge p-3 m-1">doppelganger</div>
						<div className="badge p-3 m-1">time</div>
						<div className="badge p-3 m-1">Badge</div>
					</div>
				</div>
			</article>
		</div>
	);
};

export default indexWithImage;
