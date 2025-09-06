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
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function AddTaskScreen({ navigation }: any) {
  const { addTask } = useTasks();
  const { theme } = useTheme();
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
  // Theme-aware colors
  const backgroundColor = theme === "light" ? "bg-white" : "bg-black";
  const textColor = theme === "light" ? "text-black" : "text-white";
  const inputBg = theme === "light" ? "bg-white" : "bg-transparent";
  const borderColor = theme === "light" ? "border-gray-200" : "border-white";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className={`flex-1 ${backgroundColor} p-4 pt-6`}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 z-10"
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color={theme === "light" ? "black" : "white"}
        />
      </Pressable>
      <Text
        className={`text-2xl font-poppinsBold mb-6 text-center ${textColor}`}
      >
        Add a New Task
      </Text>

      <Text className={`text-lg mb-2 font-poppins ${textColor}`}>Title</Text>
      <TextInput
        placeholder="Enter task title"
        placeholderTextColor={theme === "light" ? "#000000" : "#ffffff"}
        value={title}
        onChangeText={setTitle}
        className={`${inputBg} ${borderColor} shadow-sm border rounded-lg p-3 mb-4 text-sm ${textColor} focus:ring-0 focus:outline-0 font-poppins`}
      />

      <Text className={`text-lg mb-2 font-poppins ${textColor}`}>
        Description
      </Text>
      <TextInput
        placeholder="Enter task description"
        placeholderTextColor={theme === "light" ? "#00000" : "ffffff"}
        value={description}
        onChangeText={setDescription}
        multiline
        className={`${inputBg} ${borderColor} shadow-sm border rounded-lg p-3 mb-4 h-24 text-sm ${textColor} focus:ring-0 focus:outline-0 font-poppins`}
      />

      <Pressable
        className="bg-green-600 p-3 rounded-xl"
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-poppinsBold">
            Save Task
          </Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}
