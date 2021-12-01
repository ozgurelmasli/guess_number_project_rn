import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/colors";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber == exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};
const renderListItem = (listLength, itemData) => {
  return (
    <View key={itemData.index} style={styles.listItem}>
      <Text>#{listLength - itemData.index}</Text>
      <Text>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initalGuesses = generateRandomNumber(1, 100, props.userSelect);
  const [currentGuess, setCurrentGuess] = useState(initalGuesses);
  const [pastGuesses, setPastGuesses] = useState([initalGuesses.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userSelect, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userSelect) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userSelect, onGameOver]);

  const newGuessHandler = (direction) => {
    const condition =
      (direction === "up" && currentGuess > props.userSelect) ||
      (direction === "down" && currentGuess < props.userSelect);
    if (condition) {
      Alert.alert("Lie", "Don't be lier", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    direction === "down"
      ? (currentHigh.current = currentGuess)
      : (currentLow.current = currentGuess + 1);
    const newGuess = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(newGuess);
    setPastGuesses((cur) => [newGuess.toString(), ...cur]);
    //setRounds((curRounds) => curRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Enemy Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton
          overridenStyle={{ backgroundColor: Colors.primary, radius: 20 }}
          action={() => {
            newGuessHandler("down");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <CustomButton
          overridenStyle={{ backgroundColor: Colors.primary, radius: 20 }}
          action={() => {
            newGuessHandler("up");
          }}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(pastGuesses.length - index,guess))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this , pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  listContainer: {
    flex: 1, // android scoll view action
    width: "80%",
  },
  list: {
    flexGrow: 1, // scroll view behavior
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 15,
    marginVertical: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default GameScreen;
