import { View, Text } from "react-native";

type TaskItemProps = {
  title: string;
  description?: string;
  completed?: boolean;
};

export default function TaskItem({
  title,
  description,
  completed,
}: TaskItemProps) {
  return (
    <View
      className={`p-3 mb-3 rounded-lg ${
        completed ? "bg-green-200" : "bg-gray-100"
      }`}
    >
      <Text
        className={`text-lg font-semibold ${
          completed ? "line-through text-gray-500" : "text-black"
        }`}
      >
        {title}
      </Text>
      {description ? (
        <Text className="text-gray-600">{description}</Text>
      ) : null}
    </View>
  );
}
