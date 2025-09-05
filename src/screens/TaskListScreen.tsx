import { useState } from "react";
import { View, Text, FlatList, Pressable, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import TaskItem from "../components/TaskItem";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../contexts/TaskContext";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const [search, setSearch] = useState("");

  // filter tasks by title or description
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white p-4 pt-6">
      <Text className="text-2xl font-bold mb-4 text-center">My Tasks</Text>

      {/* Search Bar */}
      <View className="flex-row items-center border border-gray-100 rounded-lg px-3 py-2 mb-4">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-sm border-0 focus:border-0 focus:ring-0 focus:outline-0"
        />
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            title={item.title}
            description={item.description}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
            createdAt={item.createdAt}
          />
        )}
      />

      {/* Add Task Button */}
      <Pressable
        className="bg-green-600 p-3 rounded-lg mt-4"
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text className="text-white text-center font-semibold">+ Add Task</Text>
      </Pressable>
    </View>
  );
}
