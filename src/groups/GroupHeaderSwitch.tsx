import React from "react";
import SwitchSelector from "react-native-switch-selector";
import { StyleSheet } from "react-native";
import colours from "../styles/colours";

const styles = StyleSheet.create({
  switch: {
    margin: 20,
    marginBottom: 0,
    //Shadows
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
});
export default (passedProps: any) => {
  interface SwitchFix extends React.Component {}
  const Switch = SwitchSelector as any as {
    new (): SwitchFix;
  };

  const { setIsJoin } = passedProps;

  const options = [
    {
      label: "Create",
      value: false,
      testID: "switch-left",
      accessibilityLabel: "switch-cheapest",
    },
    {
      label: "Join",
      value: true,
      testID: "switch-right",
      accessibilityLabel: "switch-fastest",
    },
  ];

  const props: any = {
    options,
    initial: 0,
    onPress: (value: number) => setIsJoin(value),
    style: styles.switch,
    buttonColor: colours.primary,
    backgroundColor: colours.background,
  };

  return <Switch {...props} />;
};
