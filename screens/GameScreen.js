import React, {useState,useRef,useEffect} from 'react';
import {View,Text,StyleSheet,Alert, Dimensions, ScrollView} from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/alt-default-style';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {return rndNum;}
};

const renderListItem = (value, numOfRound) => (<View key={value} style={styles.listItem}>
      <BodyText>Round: {numOfRound}</BodyText>
      <BodyText>Guess: {value}</BodyText>

      </View>)

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice,onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert('Ooops', "This is wrong!", [{
        text: 'Sorry',
        style: 'cancel'
      }]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber,...curPastGuesses])
  };

  let listContainerStyle = styles.listContainer;

  if (Dimensions.get('window').width < 350){
    listContainerStyle = styles.listContainerBig;
  }

  if(Dimensions.get('window').height < 500){
    return (
      <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}> Opponent 's Guess</Text>
      <View style={styles.controls}>
        <MainButton onPress = {nextGuessHandler.bind(this, 'lower')}>
        <Ionicons name="md-remove" size={24} color="white"/>
        </MainButton>
        <NumberContainer > {currentGuess} </NumberContainer>
        <MainButton onPress = {nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name="md-add" size={24} color="white"/>
        </MainButton>
      </View>
      <View style={styles.listContainerStyle}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
      </View>
    )
  }

  return (
    <View style={styles.screen} >
    <Text style={DefaultStyles.bodyText}> Opponent 's Guess</Text>
    <NumberContainer > {currentGuess} </NumberContainer>
    <Card style = {styles.buttonContainer}>
    <MainButton
    onPress = {nextGuessHandler.bind(this, 'lower')}
    ><Ionicons name="md-remove" size={24} color="white"/></MainButton>
    <MainButton
    onPress = {nextGuessHandler.bind(this, 'greater')}
    ><Ionicons name="md-add" size={24} color="white"/></MainButton>
    </Card>
    <View style={styles.listConatinerStyle}>
    <ScrollView contentContainerStyle={styles.list}>
      {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}

    </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  listItem: {
      borderColor: 'green',
      marginVertical: 10,
      padding: 15,
      borderWidth: 3,
      color: 'white',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      width: '60%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  listContainer: {
    flex: 1,
    width:'60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-end'
  }
});


export default GameScreen;
