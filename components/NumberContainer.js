import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const NumberContainer= props => {
    return(
        <View style={styles.container}>
                <Text style={styles.number}>{props.children}</Text>
            </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        borderWidth: 2,
        borderColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    number: {
        color: Colors.primary,
        fontSize: 42,
    }
})
export default NumberContainer
