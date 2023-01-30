import { Pressable, Text, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function Header({title, navigation, showBackButton}: {title: string, navigation: any, showBackButton?: boolean}) {
	return (
		<View className="bg-white dark:bg-gray-900 pt-20 px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
      <View className="flex flex-row items-center gap-2">
        {showBackButton && (
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color="#6b7280" size={24} />
          </Pressable>
        )}
        <Text className="text-xl font-bold text-accent capitalize">{title}</Text>
      </View>
    </View>
	);
}
