import { View, Text, FlatList, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import TaskItem from "../components/TaskItem";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

const dummyTasks = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Milk, eggs, bread",
    completed: false,
  },
  {
    id: "2",
    title: "Do laundry",
    description: "Wash and fold clothes",
    completed: true,
  },
];

export default function TaskListScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-center">My Tasks</Text>

      <FlatList
        data={dummyTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            description={item.description}
            completed={item.completed}
          />
        )}
      />

      <Pressable
        className="bg-green-600 p-3 rounded-xl mt-4"
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text className="text-white text-center font-semibold">+ Add Task</Text>
      </Pressable>
    </View>
  );
}
