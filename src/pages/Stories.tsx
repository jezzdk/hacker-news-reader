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

export default function Stories({ route, navigation }) {
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [stories, setStories] = useState<StoryInterface[]>([]);
	const [limit, setLimit] = useState<number>(5);
	const { fetchStories } = useHackerNews();
	const wait = useWait();

  const { type } = route?.params ?? { type: "top" };

	const fetch = async (limit: number) => {
		let items = await fetchStories(type ?? "top", limit);

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
			<Header title={`${type} Stories`} navigation={navigation} showBackButton={route.params?.showBackButton} />
			<ScrollView
				className="flex-1 bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
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
								className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 active:bg-gray-100 dark:bg-gray-900"
							>
								<StoryListItem story={story} index={index} />
							</Pressable>
						))}
						<View className="flex flex-row justify-center py-10">
							<Pressable
								onPress={() => loadMore()}
								className="border border-gray-500 px-4 py-2 rounded-full hover:bg-gray-100 active:bg-gray-100"
							>
								{loadingMore ? <Text className="text-gray-900 dark:text-gray-100">Loading...</Text> : <Text className="text-gray-900 dark:text-gray-100">Load more</Text>}
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
