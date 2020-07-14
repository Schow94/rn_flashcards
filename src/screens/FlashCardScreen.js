import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashCard from '../components/FlashCard';
import googledict from '../api/googledict';
import words from '../words';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const FlashCardScreen = () => {
  const [card, setCard] = useState({
    word: '',
    definition: '',
    speech: '',
    example: '',
    synonyms: [''],
  });

  const [word, setWord] = useState('inscrutable');

  const [errMsg, setErrMsg] = useState('');

  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);

  const [front, setFront] = useState(true);

  const toggleFront = () => {
    setFront(!front);
  };

  const newCard = async () => {
    const idx = Math.floor(Math.random() * words.length);
    setWord(words[idx]);

    try {
      const res = await googledict.get(`/${word}`);

      const response = res.data[0];

      const firstKey = Object.keys(response.meaning)[0];

      const wordObj = {
        word: response.word,
        definition: response.meaning[firstKey][0]['definition'],
        speech: firstKey,
        example: response.meaning[firstKey][0]['example'],
        synonyms: [...response.meaning[firstKey][0]['synonyms']],
      };

      console.log('wordObj: ', wordObj);

      setCard(wordObj);
      setErrMsg('');
    } catch (e) {
      setErrMsg('Something went wrong');
    }
    //   Flip card to front if new word
    setFront(true);
  };

  const pressRight = () => {
    setRight(right + 1);
    newCard();
  };

  const pressWrong = () => {
    setWrong(wrong + 1);
    newCard();
  };

  useEffect(() => {
    newCard();
  }, []);

  return (
    <View style={styles.container} elevation={10}>
      <View style={styles.score}>
        <Text style={styles.right}>Right: {right}</Text>
        <Text style={styles.wrong}>Wrong: {wrong}</Text>
      </View>

      <Text style={styles.title}>Test your knowledge</Text>

      <FlashCard
        card={card}
        errMsg={errMsg}
        front={front}
        toggleFront={toggleFront}
      />

      <View style={styles.btnContainer}>
        {errMsg.length > 2 ? (
          <TouchableOpacity style={styles.nextButton} onPress={() => newCard()}>
            <Text style={styles.tryAgain}>Try again</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.rightAndWrong}>
            <TouchableOpacity
              style={styles.wrongBtn}
              onPress={() => pressWrong()}
            >
              <Entypo style={styles.btnText} name="cross" color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rightBtn}
              onPress={() => pressRight()}
            >
              <Feather style={styles.btnText} name="check" color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  title: {
    fontSize: 20,
    marginTop: 30,
    color: 'grey',
    alignSelf: 'center',
  },

  btnContainer: {
    marginTop: 50,
  },

  nextButton: {
    backgroundColor: '#2e96ff',
    width: 120,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    alignSelf: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },

  tryAgain: {
    color: 'white',
    fontSize: 20,
  },

  nextText: {
    color: 'white',
  },

  right: {
    color: 'green',
    marginLeft: 5,
    fontSize: 17,
    letterSpacing: 1,
    marginBottom: 3,
  },

  wrong: {
    color: 'red',
    marginLeft: 5,
    fontSize: 17,
    letterSpacing: 1,
  },

  score: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 5,
    marginTop: 10,
    marginTop: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  rightAndWrong: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  rightBtn: {
    backgroundColor: 'green',
    width: 120,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 20,
  },

  btnText: {
    color: 'white',
    fontSize: 35,
  },

  wrongBtn: {
    backgroundColor: 'red',
    color: 'white',
    width: 120,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default FlashCardScreen;
