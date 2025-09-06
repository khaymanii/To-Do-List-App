import { useState } from "react";
import { View, Text, FlatList, Pressable, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import TaskItem from "../components/TaskItem";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../contexts/TaskContext";
import { useTheme } from "../contexts/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const [search, setSearch] = useState("");
  const { colors, toggleTheme, theme } = useTheme();

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();

    // Convert createdAt to readable string for searching
    const dateString = new Date(task.createdAt).toLocaleString().toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      dateString.includes(query) // ✅ match against createdAt
    );
  });

  return (
    <View
      className="flex-1 p-4 pt-6"
      style={{ backgroundColor: colors.background }}
    >
      <Text
        className="text-2xl font-poppinsBold mb-6 text-center"
        style={{ color: colors.text }}
      >
        My Tasks
      </Text>
      <Pressable
        onPress={toggleTheme}
        className="absolute top-6 right-8 w-10 h-10 rounded-full items-center justify-center shadow-sm"
        style={{ backgroundColor: colors.primary }}
      >
        <Ionicons
          name={theme === "light" ? "moon" : "sunny"}
          size={20}
          color={colors.text}
        />
      </Pressable>

      {/* Search Bar */}
      <View className="flex-row items-center border border-gray-100 rounded-lg px-3 py-2 mb-4 shadow-sm">
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={{
            color: colors.text,
          }}
        />
        <TextInput
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-sm border-0 focus:border-0 focus:ring-0 focus:outline-0 font-poppins"
          style={{
            color: colors.text,
          }}
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
        <Text className="text-white text-center font-poppinsBold">
          + Add Task
        </Text>
      </Pressable>
    </View>
  );
}
