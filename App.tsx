import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "./src/screens/TaskListScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import { TaskProvider } from "./src/contexts/TaskContext";
import ToastManager from "toastify-react-native";
import { ThemeProvider } from "./src/contexts/ThemeContext";

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TaskList">
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <ToastManager />
      </TaskProvider>
    </ThemeProvider>
  );
}
