import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  TextInput,
} from "react-native";
import { createGroup } from "../requests";
import getUserId from "../storage/getUserId";
import colours from "../styles/colours";
import GroupHeaderSwitch from "./GroupHeaderSwitch";
import GroupModel from "./GroupModel";
const getStyles = (width: number, height: number): any => ({
  root: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: colours.dialogBackground,
    zIndex: 1,
  },
  dialog: {
    position: "absolute",
    left: (width - 300) / 2,
    top: (height - 400) / 2,
    width: 300,
    backgroundColor: "white",
    zIndex: 2,
  },
  header: {
    height: 50,
    layout: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  textInput: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 5,
  },
  bottomButton: {
    marginTop: 50,
    backgroundColor: colours.primary,
    color: "white",
    height: 50,
    layout: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ({ onClose }: any) => {
  const { width, height } = useWindowDimensions();
  const [isJoin, setIsJoin] = useState(false);
  const [groupName, setGroupName] = useState("");
  const styles = getStyles(width, height);
  const Header = (
    <View style={styles.header}>
      <GroupHeaderSwitch setIsJoin={setIsJoin} />
    </View>
  );

  const Name = isJoin ? (
    <TextInput style={styles.textInput} placeholder="Group Id"></TextInput>
  ) : (
    <TextInput
      style={styles.textInput}
      onChangeText={(text) => setGroupName(text)}
      placeholder="Group Name"
    ></TextInput>
  );

  const BottomButton = isJoin ? (
    <Pressable style={styles.bottomButton} onPress={onJoinGroup}>
      <Text style={{ color: "white", fontSize: 18 }}>Join Group</Text>
    </Pressable>
  ) : (
    <Pressable style={styles.bottomButton} onPress={onCreateGroup}>
      <Text style={{ color: "white", fontSize: 18 }}>Create Group</Text>
    </Pressable>
  );

  return (
    <Pressable onPress={onClose} style={styles.root}>
      <Pressable style={styles.dialog}>
        {Header}
        {Name}
        {BottomButton}
      </Pressable>
    </Pressable>
  );

  function onJoinGroup() {
    onClose();
  }

  function onCreateGroup() {
    if (groupName) {
      const group = new GroupModel(null, groupName, []);
      getUserId().then((userId) => createGroup(group, userId));
    }
    onClose();
  }
};
