import { View, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useTheme } from "../contexts/ThemeContext";

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
  const { colors } = useTheme();

  return (
    <View
      className="flex-row items-center justify-between p-3 my-3 rounded-lg border-b-[6px] shadow"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.primary,
      }}
    >
      {/* Left side: checkbox + text */}
      <View className="flex-row items-center flex-1">
        <Checkbox
          value={completed}
          onValueChange={onToggle}
          color={completed ? colors.primary : undefined}
          style={{ marginRight: 12 }}
        />
        <View>
          <Text
            className="text-lg font-medium"
            style={{
              color: colors.text,
            }}
          >
            {title}
          </Text>
          {description ? (
            <Text
              className="text-gray-500"
              style={{ color: colors.text, opacity: 0.7 }}
            >
              {description}
            </Text>
          ) : null}
          <Text
            className="text-xs text-gray-400 mt-1"
            style={{
              color: colors.text,
              opacity: 0.6,
            }}
          >
            {format(new Date(createdAt), "PPpp")}{" "}
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
