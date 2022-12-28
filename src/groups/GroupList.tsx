import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import FloatingAddButton from "../common/FloatingAddButton";
import { fetchUserGroups } from "../requests";
import getUserId from "../storage/getUserId";
import CreateGroupDialog from "./CreateGroupDialog";
import GroupItem from "./GroupItem";
import GroupModel from "./GroupModel";

export default () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [groupList, setGroupList] = useState<GroupModel[]>([]);

  useEffect(() => {
    refreshUserGroups();
  }, []);

  useEffect(() => {
    if (!createDialogOpen) {
      // hack in case group was created
      setTimeout(refreshUserGroups, 3000);
    }
  }, [createDialogOpen]);

  return (
    <View>
      {createDialogOpen && (
        <CreateGroupDialog onClose={() => setCreateDialogOpen(false)} />
      )}
      <FlatList
        data={groupList}
        renderItem={({ item }) => <GroupItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
      <FloatingAddButton onPress={() => setCreateDialogOpen(true)} />
    </View>
  );

  function refreshUserGroups() {
    getUserId()
      .then((userId) => fetchUserGroups(userId))
      .then((fetched) => setGroupList(fetched));
  }
};
