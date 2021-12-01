import React from 'react';
import { View , Text  , StyleSheet , TouchableOpacity } from 'react-native';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.action}>
            <View style={styles(props).button}>
                <Text style={styles(props).buttonText}>{ props.children }</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = (props) => StyleSheet.create({
    button: {
        backgroundColor: props.overridenStyle.backgroundColor,
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:props.overridenStyle.radius
    },
    buttonText: {
        color:props.overridenStyle.textColor,
        fontFamily:'open-sans-bold',
        fontSize: props.overridenStyle.fontSize
    }
})



export default CustomButton;