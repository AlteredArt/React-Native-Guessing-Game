import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
      setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >99){
            Alert.alert('Invalid Number!', 'Number has to be between 1 & 99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <TitleText>You Selected </TitleText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME!" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start A New Game!</TitleText>
             <Card style={styles.inputContainer}>
                <BodyText>Select A Number</BodyText>
                <Input style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='numeric'
                maxLength={2}
                keyboardType='number-pad'
                onChangeText={numberInputHandler}
                value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>
                </View>
                </Card>
                {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen;
