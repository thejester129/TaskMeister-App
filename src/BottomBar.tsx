import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colours from "./styles/colours";
import TaskList from "./weekly_task_list/WeeklyTaskList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GroupList from "./groups/GroupList";

const Tab = createBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator
      // initialRouteName="Groups"
      screenOptions={{
        tabBarActiveTintColor: colours.primary,
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TaskList}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupList}
        options={{
          tabBarLabel: "Groups",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomBar;
