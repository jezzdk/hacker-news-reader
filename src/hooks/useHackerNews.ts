import { initializeApp } from "firebase/app";
import {
	getDatabase,
	child,
	get,
	ref,
	query,
	limitToFirst,
} from "firebase/database";
import { CommentInterface, StoryInterface } from "../types";

const firebaseConfig = {
	databaseURL: "https://hacker-news.firebaseio.com",
};

export default function useHackerNews() {
	const app = initializeApp(firebaseConfig);
	const database = ref(getDatabase(app));

	const getTopStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("top", limit);
	};

	const getNewStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("new", limit);
	};

	const getBestStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("best", limit);
	};

	const getAskStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("ask", limit);
	};

	const getShowStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("show", limit);
	};

	const getJobStories = async (limit: number): Promise<StoryInterface[]> => {
		return fetchStories("job", limit);
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
			query(child(database, `v0/${type}stories`), limitToFirst(limit)),
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

  const fetchKids = async (kids: number[]): Promise<CommentInterface[]> => {
    const promises = kids.map(async (id) => {
      const item = await get(child(database, `v0/item/${id}`)).catch(
        (error) => {
          console.error(error);
        },
      );

      if (item?.exists()) {
        let comment = item.val();

        return comment;
      }
    });

    return await Promise.all(promises);
  }

	return {
		getTopStories,
		fetchStories,
		fetchStory,
    fetchKids,
	};
}
