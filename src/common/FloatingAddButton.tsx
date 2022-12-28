import { Pressable, View, Text, useWindowDimensions } from "react-native";
import colours from "../styles/colours";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const getStyles = (height: any): any => ({
  root: {
    borderRadius: 50,
    backgroundColor: colours.primary,
    width: 50,
    height: 50,
    layout: "flex",
    position: "absolute",
    top: height - 200,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ({ onPress }: any) => {
  const { width, height } = useWindowDimensions();
  const styles = getStyles(height);
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <MaterialCommunityIcons name="plus" color={"white"} size={35} />
    </Pressable>
  );
};
