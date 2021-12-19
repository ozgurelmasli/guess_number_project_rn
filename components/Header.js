import React from 'react';
import { View , Text  , StyleSheet , Platform, ColorPropType } from 'react-native';
import colors from '../constants/colors'

const Header = props => {
    return (
        <View style={{...styles.headerBase ,...Platform.select({
            ios: styles.headeriOS,
            android:styles.headerAndroid
        })}}>
            <Text style={styles.headtitle}>{ props.title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height:90,
        paddingTop:36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headeriOS:{
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderWidth: 1
    },
    headerAndroid:{
        backgroundColor: colors.primary
    },
    headtitle: {
        color: Platform.OS === 'android' ? 'white' : colors.primary ,
        fontSize:25,
        fontFamily:'open-sans-bold',
    }
})

export default Header;