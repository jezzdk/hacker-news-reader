import { Pressable, Text, View } from "react-native";
import { ArrowLeftIcon, BellIcon, BookmarkIcon } from "react-native-heroicons/outline";

export default function StoryHeader({
	title,
	navigation,
}: { title: string; navigation: any }) {
	return (
		<View className="bg-white dark:bg-gray-900 pt-12 px-4 pb-4 border-b border-gray-200 dark:border-gray-700 flex flex-row">
			<View className="flex-1 flex flex-row items-center justify-between">
				<Pressable onPress={() => navigation.goBack()}>
					<ArrowLeftIcon color="#6b7280" size={24} />
				</Pressable>
				<Text className="text-xl font-bold text-accent ml-4">{title}</Text>
        <View className="w-12 flex flex-row items-center gap-2">
          {/* <Pressable onPress={() => alert("Coming soon!")}>
            <BookmarkIcon color="#6b7280" size={24} />
          </Pressable>
          <Pressable onPress={() => alert("Coming soon!")}>
            <BellIcon color="#6b7280" size={24} />
          </Pressable> */}
        </View>
			</View>
		</View>
	);
}
