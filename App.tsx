import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "./src/screens/TaskListScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import { TaskProvider } from "./src/contexts/TaskContext";
import ToastManager from "toastify-react-native";

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastManager />
    </TaskProvider>
  );
}
