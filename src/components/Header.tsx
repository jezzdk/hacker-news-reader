import { Text, View } from "react-native";

export default function Header({title, navigation}: {title: string, navigation: any}) {
	return (
		<View className="bg-white dark:bg-gray-900 pt-20 px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
      <View>
        <Text className="text-xl font-bold text-accent">{title}</Text>
      </View>
    </View>
	);
}
