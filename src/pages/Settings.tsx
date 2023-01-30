import { useColorScheme } from "nativewind";
import { Button, Text, View } from "react-native";

export default function Settings() {
	const { colorScheme, setColorScheme } = useColorScheme();

	return (
		<View className="flex-1 items-center justify-center dark:bg-gray-800">
			<Text className="text-gray-900 dark:text-white">Settings Screen</Text>
			<Text
				className="text-gray-900 dark:text-white"
				onPress={() =>
					setColorScheme(colorScheme === "light" ? "dark" : "light")
				}
			>
				{`The color scheme is ${colorScheme}`}
			</Text>
		</View>
	);
}

export function SettingsModal({ navigation }) {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-1 items-center justify-center">
			<Text>Settings Modal</Text>
			<Text>{`The color scheme is ${colorScheme}`}</Text>
			<Button onPress={() => navigation.goBack()} title="Dismiss" />
		</View>
	);
}
