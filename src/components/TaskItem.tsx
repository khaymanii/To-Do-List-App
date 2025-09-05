import { View, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

type TaskItemProps = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  title,
  description,
  completed,
  onToggle,
  onDelete,
  createdAt,
}: TaskItemProps) {
  return (
    <View className="flex-row items-center justify-between bg-green-50 p-3 mb-2 rounded-lg">
      {/* Left side: checkbox + text */}
      <View className="flex-row items-center flex-1">
        <Checkbox
          value={completed}
          onValueChange={onToggle}
          color={completed ? "#16A34A" : undefined}
          style={{ marginRight: 12 }}
        />
        <View>
          <Text className="text-lg font-medium">{title}</Text>
          {description ? (
            <Text className="text-gray-500">{description}</Text>
          ) : null}
          <Text className="text-xs text-gray-400 mt-1">
            {format(new Date(createdAt), "PPpp")}{" "}
            {/* e.g. Jan 1, 2025, 12:30 PM */}
          </Text>
        </View>
      </View>

      {/* Delete button */}
      <Pressable onPress={onDelete}>
        <Ionicons name="trash" size={20} color="red" />
      </Pressable>
    </View>
  );
}
