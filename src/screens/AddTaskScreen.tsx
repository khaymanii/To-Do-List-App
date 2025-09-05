import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useTasks } from "../contexts/TaskContext";
import { Toast } from "toastify-react-native";

export default function AddTaskScreen({ navigation }: any) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Toast.error("Title is required");
      return;
    }
    setLoading(true);
    await addTask(title, description);
    setLoading(false);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white p-4"
    >
      <Text className="text-2xl font-bold mb-4 text-center">
        Add a New Task
      </Text>

      <Text className="text-lg mb-2">Title</Text>
      <TextInput
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-100 rounded-lg p-3 mb-4 focus:ring-1 focus:ring-green-600"
      />

      <Text className="text-lg mb-2">Description</Text>
      <TextInput
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        className="border border-gray-100 rounded-lg p-3 mb-4 h-24 focus:ring-1 focus:ring-green-600"
      />

      <Pressable
        className="bg-green-600 p-3 rounded-xl"
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Save Task
          </Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}
