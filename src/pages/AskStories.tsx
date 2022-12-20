import { useCallback, useEffect, useState } from "react";
import {
	Pressable,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { StoryInterface } from "../types";
import useHackerNews from "../hooks/useHackerNews";
import useWait from "../hooks/useWait";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import StoryListItem from "../components/StoryListItem";
import Header from "../components/Header";

dayjs.extend(relativeTime);

export default function AskStories({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [stories, setStories] = useState<StoryInterface[]>([]);
	const [limit, setLimit] = useState<number>(5);
	const { getAskStories } = useHackerNews();
	const wait = useWait();

	const fetch = async (limit: number) => {
		let items = await getAskStories(limit);

		if (items) {
			setStories(items);
			setLoading(false);
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		fetch(limit);
	}, []);

	const onRefresh = useCallback(() => {
		setLoading(true);
		setLimit(10);

		wait(2000).then(async () => {
			fetch(10);
		});
	}, []);

	const loadMore = () => {
		setLoadingMore(true);
		setLimit(limit + 10);
		fetch(limit + 10);
	};

	return (
		<View className="flex-1">
			<Header title="Ask HN" navigation={navigation} />
			<ScrollView
				className="flex-1 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={onRefresh} />
				}
			>
				{!loading && stories.length > 0 && (
					<View>
						{stories.map((story, index) => (
							<Pressable
								key={story.id}
								onPress={() => navigation.navigate("Story", { id: story.id })}
								className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white hover:bg-violet-100 active:bg-violet-100 dark:bg-gray-900"
							>
								<StoryListItem story={story} index={index} />
							</Pressable>
						))}
						<View className="flex flex-row justify-center py-10">
							<Pressable
								onPress={() => loadMore()}
								className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-100"
							>
								{loadingMore ? <Text>Loading...</Text> : <Text>Load more</Text>}
							</Pressable>
						</View>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		color: "#000",
	},
});
