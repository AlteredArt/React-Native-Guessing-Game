import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button, ScrollView, KeyboardAvoidingView, Dimensions, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);



    const numberInputHandler = inputText => {
      setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect(() => {
      const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width/4);
      }
      Dimensions.addEventListener('change', updateLayout);
      return () => {
        Dimensions.removeEventListener('change', updateLayout);
      }
    })

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
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAME!</MainButton>
            </Card>
    }

    return (
      <ScrollView>
      <KeyboardAvoidingView behavior='position' beyboardVerticalOffset={30}>
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
                    <View style={{width: buttonWidth}}>
                        <MainButton onPress={resetInputHandler} color={Colors.accent}>
                        Reset</MainButton>
                        </View>
                    <View style={{width: buttonWidth}}>
                        <MainButton onPress={confirmInputHandler} color={Colors.primary}>
                        Agree</MainButton>
                        </View>
                </View>
                </Card>
                {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
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
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: {
    //     // width: 110
    //     width: Dimensions.get('window').width / 3
    // },
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
