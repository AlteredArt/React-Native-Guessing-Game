import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center'
    },
    title: {
        // paddingTop: 36,
        color: 'black',
        fontSize: 28,

    }
});

export default Header;