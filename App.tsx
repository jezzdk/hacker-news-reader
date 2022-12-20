import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopStories from "./src/pages/TopStories";
import AskStories from "./src/pages/AskStories";
import Story from "./src/pages/Story";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import { Cog6ToothIcon, NewspaperIcon, QuestionMarkCircleIcon } from "react-native-heroicons/outline";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StoriesScreen() {
	return (
		<Stack.Navigator initialRouteName="Latest">
			<Stack.Screen
				name="Latest"
				component={TopStories}
				options={{
					title: "Latest Stories",
					headerStyle: {
						backgroundColor: styles.header.backgroundColor,
					},
					headerTintColor: styles.header.color,
					headerTitleStyle: {
						fontWeight: styles.header.fontWeight,
					},
				}}
			/>
		</Stack.Navigator>
	);
}

function AskHnScreen() {
	return (
		<Stack.Navigator initialRouteName="AskHn">
			<Stack.Screen
				name="AskHn"
				component={AskStories}
				options={{
					title: "Ask HN",
					headerStyle: {
						backgroundColor: styles.header.backgroundColor,
					},
					headerTintColor: styles.header.color,
					headerTitleStyle: {
						fontWeight: styles.header.fontWeight,
					},
				}}
			/>
		</Stack.Navigator>
	);
}

function MainScreen() {
	return (
		<Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'TopStories') {
            return <NewspaperIcon color={color} size={24} />
          } else if (route.name === 'AskStories') {
            return <QuestionMarkCircleIcon color={color} size={24} />
          } else if (route.name === 'SettingsScreen') {
            return <Cog6ToothIcon color={color} size={24} />
          }
        },
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'gray',
      })}
    >
			<Tab.Screen
				name="TopStories"
				component={TopStories}
				options={{ headerShown: false, title: "Top Stories" }}
			/>
			<Tab.Screen
				name="AskStories"
				component={AskStories}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name="SettingsScreen" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

function SettingsScreen() {
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

function SettingsModal({ navigation }) {
	const { colorScheme } = useColorScheme();
	return (
		<View className="flex-1 items-center justify-center">
			<Text>Settings Modal</Text>
			<Text>{`The color scheme is ${colorScheme}`}</Text>
			<Button onPress={() => navigation.goBack()} title="Dismiss" />
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<RootStack.Navigator
				initialRouteName="Main"
        screenOptions={{ headerShown: false }}
			>
				<RootStack.Group>
					<RootStack.Screen name="Main" component={MainScreen} />
					<RootStack.Screen
						name="Story"
						component={Story}
						options={{
							headerShown: false,
							headerStyle: {
								backgroundColor: styles.header.backgroundColor,
							},
							headerTintColor: styles.header.color,
							headerTitleStyle: {
								fontWeight: styles.header.fontWeight,
							},
							headerBackTitle: "Back",
						}}
					/>
				</RootStack.Group>
				<RootStack.Group screenOptions={{ presentation: "modal" }}>
					<RootStack.Screen name="SettingsModal" component={SettingsModal} />
				</RootStack.Group>
			</RootStack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#ff6600",
		color: "#000",
		fontWeight: "bold",
	},
});
