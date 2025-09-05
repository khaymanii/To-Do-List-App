import { View, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

type TaskItemProps = {
  title: string;
  description?: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  title,
  description,
  completed,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <View className="flex-row items-center justify-between bg-gray-50 p-3 mb-2 rounded-lg">
      {/* Left side: checkbox + text */}
      <View className="flex-row items-center flex-1">
        <Checkbox
          value={completed}
          onValueChange={onToggle}
          color={completed ? "#16A34A" : undefined} // ✅ Green when checked
          style={{ marginRight: 12 }}
        />
        <View>
          <Text className="text-lg font-medium">{title}</Text>
          {description ? (
            <Text className="text-gray-500">{description}</Text>
          ) : null}
        </View>
      </View>

      {/* Delete button */}
      <Pressable onPress={onDelete}>
        <Ionicons name="trash" size={20} color="red" />
      </Pressable>
    </View>
  );
}
