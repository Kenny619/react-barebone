import ReviewButton from "../components/button/reviewButtons";
import TitleText from "../components/elements/TitleText";
import LeadText from "../components/elements/LeadText";

const Review = () => {
	return (
		<div className="m-2 p-2 flex flex-col">
			<TitleText text="Review" />
			<div className="m-4 p-4 rounded-sm bg-slate-600">
				<h2 className="m-2 p-2 text-xl">Title of the story to be reviewed</h2>
				<LeadText text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ad perferendis iusto libero? Repellendus aliquam quidem aspernatur explicabo, natus minus ad facere tempore quia nihil iste aperiam voluptates facilis repellat." />
			</div>
			<ReviewButton />
		</div>
	);
};

export default Review;
