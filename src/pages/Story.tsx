import { useCallback, useEffect, useState } from "react";
import { StoryInterface } from "../types";
import {
  Linking,
	Pressable,
	RefreshControl,
	ScrollView,
	Text,
	View,
} from "react-native";
import dayjs from "dayjs";
import useHackerNews from "../hooks/useHackerNews";
import useWait from "../hooks/useWait";
import StoryHeader from "../components/StoryHeader";
import {
	ChatBubbleBottomCenterIcon,
	StarIcon,
	UserIcon,
} from "react-native-heroicons/outline";
import {
	ArrowTopRightOnSquareIcon,
} from "react-native-heroicons/solid";

export default function Story({ route, navigation }) {
	const [loading, setLoading] = useState(true);
	const [story, setStory] = useState<StoryInterface>();
	const { fetchStory } = useHackerNews();
	const wait = useWait();

	const fetch = async () => {
		let item = await fetchStory(route.params.id);

		if (item) {
			setStory(item);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	const onRefresh = useCallback(() => {
		setLoading(true);

		wait(2000).then(async () => {
			fetch();
		});
	}, []);

	return (
		<View className="flex-1 items-center bg-white dark:bg-gray-900">
			<StoryHeader title="Story" navigation={navigation} />
			<ScrollView
				className="flex-1"
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={onRefresh} />
				}
			>
				{loading ? (
					<Text className="text-center text-gray-900 dark:text-white p-4">Loading...</Text>
				) : (
					<View className="flex-1 items-center flex flex-col justify-end p-4">
						<View className="flex-1">
							<View className="mb-4">
								<Text className="text-xl font-bold text-gray-900 dark:text-gray-100">
									{story.title}{" "}
									<Text className="text-xs font-normal">
										({dayjs(story.time * 1000).fromNow()})
									</Text>
								</Text>
							</View>
							<View className="flex flex-row items-center justify-between">
								<View className="flex flex-row">
									<View className="mr-2">
										<UserIcon color="#6b7280" size={16} />
									</View>
									<Text className="text-xs text-gray-500">{story.by}</Text>
								</View>
								<View className="flex flex-row gap-6">
									<View className="flex flex-row">
										<View className="mr-2">
											<StarIcon color="#6b7280" size={16} />
										</View>
										<Text className="text-xs text-gray-500">{story.score}</Text>
									</View>
									<View className="flex flex-row">
										<View className="mr-2">
											<ChatBubbleBottomCenterIcon color="#6b7280" size={16} />
										</View>
										<Text className="text-xs text-gray-500">
											{story.descendants}
										</Text>
									</View>
								</View>
							</View>
						</View>
						<Text>{story?.text}</Text>
					</View>
				)}
			</ScrollView>
			<View className="flex w-full p-4">
				<Pressable onPress={() => Linking.openURL(story.url)} className="bg-accent rounded-lg py-3 w-full">
					<View className="flex flex-row items-center justify-center gap-3">
						<Text className="text-base text-white">Visit link</Text>
						<ArrowTopRightOnSquareIcon color="white" size={18} />
					</View>
				</Pressable>
			</View>
		</View>
	);
}
