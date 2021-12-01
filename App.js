import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOver';


const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
}


export default function App() {
    const [selectedUserNumber, setSelectedUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)
    const [dataLoaded, setDataLoaded] = useState(false)
    if (!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => {
            setDataLoaded(true) }}
            onError={ (err) => {
                console.log(err)
            }}
        />
    }

    const newGameHandler = () => {
        setGuessRounds(0)
        setSelectedUserNumber(null)
    }
    const startGameHandler = (selectedNumber) => {
        setSelectedUserNumber(selectedNumber)
        setGuessRounds(0)
    }
    const gameOverHandler = (numOfRaunds) => {
        setGuessRounds(numOfRaunds)
    }
    let content = <StartGameScreen onStartGame={startGameHandler}/>;
    if (selectedUserNumber && guessRounds <= 0) {
        content = <GameScreen userSelect={selectedUserNumber} onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
        content =
            <GameOverScreen onStartGame={newGameHandler}
                            roundsNumber={guessRounds}
                            userNumber={selectedUserNumber}/>
    }
    return (
        <View style={styles.screen}>
            <Header title="Guess a number"/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});
