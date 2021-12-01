import React from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton"


const GameOverScreen = props => {
    const startAgainButtonHandler = () => {
        props.onStartGame()
    }
    return <View style={styles.screen}>
        <Text style={styles.titleText}>Game is over!!</Text>
        <Image
            fadeDuration={1000}
            // source={{uri:'data:image/png;base64,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'}}
            source={require('../assets/Images/success.png')}
            style={styles.image}
            resizeMode="cover"/>
        <View style={styles.resultContainer}>
            <Text style={styles.descriptionText}>
                Your number of rounds : <Text style={styles.titleText}>{props.roundsNumber} </Text> Number was : <Text
                style={styles.titleText}>{props.userNumber} </Text>
            </Text>
        </View>
        <CustomButton overridenStyle={{
          backgroundColor:Colors.primary,
          textColor:'white',
          fontSize:20,
          radius:12
        }} action={() => {startAgainButtonHandler()}}>
          Start Again
        </CustomButton>
    </View>
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginTop:30
    },
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 30
    },
    descriptionText: {
        fontFamily: 'open-sans',
        fontSize: 20,
    },
    resultContainer:{
        width:'70%'
    }
})


export default GameOverScreen;