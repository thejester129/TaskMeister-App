import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { fetchWeeklyTasks } from "../requests";
import getUserId from "../storage/getUserId";
import WeeklyTaskItem from "./WeeklyTaskItem";
import WeeklyTaskModel from "./WeeklyTaskModel";

export default () => {
  const [taskList, setTaskList] = useState<WeeklyTaskModel[]>([]);

  useEffect(() => {
    const interval = setInterval(refreshTasks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <FlatList
        data={taskList}
        renderItem={({ item }) => <WeeklyTaskItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  function refreshTasks() {
    getUserId()
      .then((userId) => fetchWeeklyTasks(userId))
      .then((fetched) => setTaskList(fetched));
  }
};
