import React from "react";
import { View, StyleSheet } from "react-native";
import colours from "../styles/colours";

const styles = StyleSheet.create({
  filterBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colours.dialogBackground,
    zIndex: 100,
  },
});
export default () => {
  return <View style={styles.filterBackground} />;
};
