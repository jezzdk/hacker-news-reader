import dayjs from "dayjs";
import { Text, View } from "react-native";
import { ChatBubbleBottomCenterIcon, StarIcon, UserIcon } from "react-native-heroicons/outline";
import { StoryInterface } from "../types";

export default function StoryListItem({story, index}: {story: StoryInterface, index: number}) {
	return (
		<View className="flex flex-row">
			<View className="w-8">
				<Text className="font-bold text-base text-gray-400">{index + 1}.</Text>
			</View>
			<View className="flex-1">
				<View className="mb-2">
					<Text className="text-base font-bold text-gray-900 dark:text-gray-100">
						{story.title}{" "}
						<Text className="text-xs font-normal">
							({dayjs(story.time * 1000).fromNow()})
						</Text>
					</Text>
				</View>
				<View className="flex flex-row items-center justify-between">
					<View className="flex flex-row">
						<View className="mr-2">
							<UserIcon color="#999999" size={16} />
						</View>
						<Text className="text-xs text-gray-500">{story.by}</Text>
					</View>
					<View className="flex flex-row gap-6">
						<View className="flex flex-row">
							<View className="mr-2">
								<StarIcon color="#999999" size={16} />
							</View>
							<Text className="text-xs text-gray-500">{story.score}</Text>
						</View>
						<View className="flex flex-row">
							<View className="mr-2">
								<ChatBubbleBottomCenterIcon color="#999999" size={16} />
							</View>
							<Text className="text-xs text-gray-500">{story.descendants}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
