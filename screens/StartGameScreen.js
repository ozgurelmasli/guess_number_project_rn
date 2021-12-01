import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";
import NumberContainer from '../components/NumberContainer'
import CustomButton from "../components/CustomButton";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [isConfirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const enteredNumberHandler = (inputText) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredNumber("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const choosedNumber = parseInt(enteredNumber);
    if (isNaN(choosedNumber) || choosedNumber <= 0 || choosedNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be greater than or equal to 0 and lower than 99.",
        [
            {
                text : "Okay",
                style: 'destructive',
                onPress: resetInputHandler
            }
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredNumber));
    setEnteredNumber("");
    Keyboard.dismiss()
  };
  let confirmedOutput;
  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedOutput}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <CustomButton overridenStyle={{
          backgroundColor:colors.primary,
          textColor:'white',
          fontSize: 25,
          radius:8
        }} action={() => {props.onStartGame(selectedNumber)}}>
          Start Game
        </CustomButton>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={enteredNumberHandler}
            value={enteredNumber}
          />
          <View style={styles.buttonContainer}>
            <View>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={colors.primary}
              />
            </View>
            <View style={styles.confirmButton}>
              <Button
                title="Confirm"
                color={colors.accent}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  input: {
    width: "30%",
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
    fontFamily:'open-sans-bold'
  },
  confirmButton: {
    width: 100,
    borderRadius: 12,
  },
  confirmedOutput: {
    marginVertical:30,
    alignItems: "center",
  }
});

export default StartGameScreen;
