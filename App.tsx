import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Story from "./src/pages/Story";
import Settings from "./src/pages/Settings";
import SettingsModal from "./src/pages/Settings";
import Bookmarks from "./src/pages/Bookmarks";
import Categories from "./src/pages/Categories";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { BookmarkIcon, Cog6ToothIcon, NewspaperIcon, TagIcon } from "react-native-heroicons/outline";
import Stories from "./src/pages/Stories";
import TopStories from "./src/pages/Stories";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CategoriesStack = createNativeStackNavigator();

function MainScreen() {
	return (
		<Tab.Navigator
      initialRouteName="Stories"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'TopStories') {
            return <NewspaperIcon color={color} size={24} />
          } else if (route.name === 'CategoriesScreen') {
            return <TagIcon color={color} size={24} />
          } else if (route.name === 'Bookmarks') {
            return <BookmarkIcon color={color} size={24} />
          } else if (route.name === 'Settings') {
            return <Cog6ToothIcon color={color} size={24} />
          }
        },
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel(props) {
          if (route.name === 'CategoriesScreen') {
            return <Text className={["text-xs", props.focused ? "text-accent" : "text-gray-500"].join(" ")}>Categories</Text>;
          } else if (route.name === 'TopStories') {
            return <Text className={["text-xs", props.focused ? "text-accent" : "text-gray-500"].join(" ")}>Top Stories</Text>;
          }

          return <Text className={["text-xs", props.focused ? "text-accent" : "text-gray-500"].join(" ")}>{route.name}</Text>;
        },
      })}
    >
			<Tab.Screen
				name="CategoriesScreen"
				component={CategoriesScreen}
				options={{ headerShown: false }}

			/>
			<Tab.Screen
				name="TopStories"
				component={TopStories}
				options={{ headerShown: false }}
			/>
      <Tab.Screen
				name="Bookmarks"
				component={Bookmarks}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}

function CategoriesScreen() {
  return (
    <CategoriesStack.Navigator
      initialRouteName="Stories"
      screenOptions={{ headerShown: false }}
    >
      <CategoriesStack.Screen name="Categories" component={Categories} />
      <CategoriesStack.Screen name="Stories" component={Stories} />
    </CategoriesStack.Navigator>
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
          <RootStack.Screen name="Settings" component={Settings} />
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
