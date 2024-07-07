import { useRouteError } from "react-router-dom";
import Title from "../components/elements/TitleText";
import LeadText from "../components/elements/LeadText";

export default function ErrorPage() {
	const error = useRouteError();

	return (
		<div id="error-page">
			<Title text="Oops!" />
			<LeadText text="Sorry, an unexpected error has occurred." />
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
