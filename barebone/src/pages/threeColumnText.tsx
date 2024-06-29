import React from "react";

const threeColumnText = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Left Column Text</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam ut
				adipisci asperiores, expedita repudiandae eius nisi cum suscipit tenetur
				voluptatum vitae. Natus voluptatum aliquid doloribus debitis earum,
				quidem maiores delectus.lorem ipsum dolor sit amet
			</p>

			<button type="button" className="bg-blue-500 text-white py-2 rounded-sm">
				Read More
			</button>

			<h1>Center Column Text</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam ut
				adipisci asperiores, expedita repudiandae eius nisi cum suscipit tenetur
				voluptatum vitae. Natus voluptatum aliquid doloribus debitis earum,
				quidem maiores delectus.lorem ipsum dolor sit amet
			</p>

			<button type="button" className="bg-blue-500 text-white py-2 rounded-sm">
				Read More
			</button>

			<h1>Right Column Text</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam ut
				adipisci asperiores, expedita repudiandae eius nisi cum suscipit tenetur
				voluptatum vitae. Natus voluptatum aliquid doloribus debitis earum,
				quidem maiores delectus.lorem ipsum dolor sit amet
			</p>

			<button type="button" className="bg-blue-500 text-white py-2 rounded-sm">
				Read More
			</button>
		</div>
	);
};

export default threeColumnText;
