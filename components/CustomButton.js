import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const CustomButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.container}>
      <ButtonComponent onPress={props.action}>
        <View style={styles(props).button}>
          <Text style={styles(props).buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    container: {
      borderRadius: 25,
      overflow: "hidden",
    },
    button: {
      backgroundColor: props.overridenStyle.backgroundColor,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: props.overridenStyle.radius,
    },
    buttonText: {
      color: props.overridenStyle.textColor,
      fontFamily: "open-sans-bold",
      fontSize: props.overridenStyle.fontSize,
    },
  });

export default CustomButton;
