import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import copyToClipboard from "../helpers/copyToClipboard";
import WeeklyTaskModel from "./WeeklyTaskModel";
import Checkbox from "expo-checkbox";
import colours from "../styles/colours";
import { completeTask, uncompleteTask } from "../requests";
import getUserId from "../storage/getUserId";

const styles: any = {
  root: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    layout: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginRight: 30,
    fontSize: 15,
  },
  copyId: {
    borderRadius: 8,
    backgroundColor: "gray",
    width: 120,
    alignSelf: "center",
    marginTop: 15,
    padding: 5,
    paddingLeft: -5,
  },
};
export default ({ item }: { item: WeeklyTaskModel }) => {
  const [isChecked, setChecked] = useState(item.complete);
  useEffect(() => {
    setChecked(item.complete);
  }, [item]);
  return (
    <Pressable style={styles.root} onPress={toggleComplete}>
      <Text style={styles.text}>{item.name}</Text>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={toggleComplete}
        color={isChecked ? colours.primary : undefined}
      />
    </Pressable>
  );

  function toggleComplete() {
    const complete = !isChecked;
    setChecked(complete);
    getUserId().then((userId) =>
      complete ? completeTask(item.id, userId) : uncompleteTask(item.id, userId)
    );
  }
};
