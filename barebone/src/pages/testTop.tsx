import React from "react";

import Title from "../components/elements/TitleText";
import LeadText from "../components/elements/LeadText";
import ToastButton from "./toastButton";
function TestTop() {
	return (
		<div className="w-full h-full flex-none">
			<Title text="test Top" />
			<LeadText text="lorem ipsum dolor sit amet" />
			<ToastButton />
		</div>
	);
}

export default TestTop;
