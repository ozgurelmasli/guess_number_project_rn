import React from 'react';
import { View , Text  , StyleSheet } from 'react-native';
import colors from '../constants/colors'

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headtitle}>{ props.title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height:90,
        paddingTop:36,
        backgroundColor:colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headtitle: {
        color:'white',
        fontSize:25,
        fontFamily:'open-sans-bold',
    }
})

export default Header;