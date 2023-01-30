import { Pressable, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";

export default function Categories({navigation}) {
	return (
		<View className="flex-1">
			<Header title="Categories" navigation={navigation} />
      <ScrollView className="flex-1 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <View className="flex-1 flex-row flex-wrap w-full">
          <View className="w-1/2 p-4">
            <Pressable onPress={() => navigation.navigate("Stories", { type: "new", showBackButton: true })} className="border border-gray-500 hover:bg-gray-100 active:bg-gray-100 pt-20 pb-4 px-4 flex flex-row justify-start items-end rounded-lg">
              <Text className="font-bold text-lg text-accent">New</Text>
            </Pressable>
          </View>
          <View className="w-1/2 p-4">
            <Pressable onPress={() => navigation.navigate("Stories", { type: "best", showBackButton: true })} className="border border-gray-500 hover:bg-gray-100 active:bg-gray-100 pt-20 pb-4 px-4 flex flex-row justify-start items-end rounded-lg">
              <Text className="font-bold text-lg text-accent">Best</Text>
            </Pressable>
          </View>
          <View className="w-1/2 p-4">
            <Pressable onPress={() => navigation.navigate("Stories", { type: "show", showBackButton: true })} className="border border-gray-500 hover:bg-gray-100 active:bg-gray-100 pt-20 pb-4 px-4 flex flex-row justify-start items-end rounded-lg">
              <Text className="font-bold text-lg text-accent">Show</Text>
            </Pressable>
          </View>
          <View className="w-1/2 p-4">
            <Pressable onPress={() => navigation.navigate("Stories", { type: "ask", showBackButton: true })} className="border border-gray-500 hover:bg-gray-100 active:bg-gray-100 pt-20 pb-4 px-4 flex flex-row justify-start items-end rounded-lg">
              <Text className="font-bold text-lg text-accent">Ask</Text>
            </Pressable>
          </View>
          <View className="w-1/2 p-4">
            <Pressable onPress={() => navigation.navigate("Stories", { type: "job", showBackButton: true })} className="border border-gray-500 hover:bg-gray-100 active:bg-gray-100 pt-20 pb-4 px-4 flex flex-row justify-start items-end rounded-lg">
              <Text className="font-bold text-lg text-accent">Jobs</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
		</View>
	);
}
