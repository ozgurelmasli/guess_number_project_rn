import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import CustomButton from "../components/CustomButton";


const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [isConfirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth , setButtonWidth] = useState(Dimensions.get('window').width / 4)

  Dimensions.addEventListener('change',() => {
    setButtonWidth(Dimensions.get('window').width / 4)
  })

  useEffect(() => {
    Dimensions.addEventListener('change',() => {
      setButtonWidth(Dimensions.get('window').width / 4)
    })
    return () => {
      Dimensions.removeEventListener('change',() => {
        setButtonWidth(Dimensions.get('window').width / 4)
      })
    }
  })

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
            text: "Okay",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredNumber));
    setEnteredNumber("");
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedOutput}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <CustomButton
          overridenStyle={{
            backgroundColor: colors.primary,
            textColor: "white",
            fontSize: 25,
            radius: 8,
          }}
          action={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          Start Game
        </CustomButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
              <View style={{width:buttonWidth}}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={colors.primary}
                  />
                </View>
                <View style={{width:buttonWidth}}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  input: {
    width: "30%",
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  confirmedOutput: {
    marginVertical: 30,
    alignItems: "center",
  },
});

export default StartGameScreen;
