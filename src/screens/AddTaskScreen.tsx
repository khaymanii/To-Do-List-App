import { View, Text, TextInput, Pressable } from "react-native";

export default function AddTaskScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">
        Add a New Task
      </Text>

      <Text className="text-lg mb-2">Title</Text>
      <TextInput
        placeholder="Enter task title"
        className="border border-gray-100 rounded-lg p-3 mb-4 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none focus:outline-none"
      />

      <Text className="text-lg mb-2">Description</Text>
      <TextInput
        placeholder="Enter task description"
        multiline
        className="border border-gray-100 rounded-lg p-3 mb-4 h-24 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none focus:outline-none"
      />

      <Pressable className="bg-green-600 p-3 rounded-xl">
        <Text className="text-white text-center font-semibold">Save Task</Text>
      </Pressable>
    </View>
  );
}
