import { initializeApp } from "firebase/app";
import {
	getDatabase,
	child,
	get,
	ref,
	query,
	limitToFirst,
} from "firebase/database";
import { StoryInterface } from "../types";

const firebaseConfig = {
	databaseURL: "https://hacker-news.firebaseio.com",
};

export default function useHackerNews() {
	const app = initializeApp(firebaseConfig);
	const database = ref(getDatabase(app));

	const getTopStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("topstories", limit);
	};

	const getNewStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("newstories", limit);
	};

	const getBestStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("beststories", limit);
	};

	const getAskStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("askstories", limit);
	};

	const getShowStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("showstories", limit);
	};

	const getJobStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("jobstories", limit);
	};

	const fetchStory = async (storyId): Promise<StoryInterface> => {
		const item = await get(child(database, `v0/item/${storyId}`)).catch(
			(error) => {
				console.error(error);
			},
		);

		if (item?.exists()) {
			return item.val();
		} else {
			return null;
		}
	};

	const fetchStories = async (type, limit = 10): Promise<StoryInterface[]> => {
		const items = await get(
			query(child(database, "v0/" + type), limitToFirst(limit)),
		).catch((error) => {
			console.error(error);
		});

		if (items?.exists()) {
			const promises = items.val().map(async (id) => {
				const item = await get(child(database, `v0/item/${id}`)).catch(
					(error) => {
						console.error(error);
					},
				);

				if (item?.exists()) {
					return item.val();
				}
			});

			return await Promise.all(promises);
		} else {
			return null;
		}
	};

	return {
		getTopStories,
		getNewStories,
		getBestStories,
		getAskStories,
		getShowStories,
		getJobStories,
		fetchStory,
	};
}
