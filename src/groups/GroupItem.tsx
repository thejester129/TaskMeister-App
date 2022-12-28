import { View, Text, Pressable } from "react-native";
import copyToClipboard from "../helpers/copyToClipboard";
import GroupModel from "./GroupModel";

const styles: any = {
  root: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
  },
  text: {
    marginTop: 15,
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
export default ({ item }: { item: GroupModel }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Name : {item.name}</Text>
      <Text style={styles.text} numberOfLines={1}>
        Id : {item.id}
      </Text>
      <Pressable
        style={styles.copyId}
        onPress={() => {
          copyToClipboard(item.id);
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Copy Id</Text>
      </Pressable>
    </View>
  );
};
