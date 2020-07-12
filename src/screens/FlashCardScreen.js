import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashCard from '../components/FlashCard';
import googledict from '../api/googledict';
import words from '../words';

// const words = [
//   {
//     word: 'Ambiguous',
//     pronounciation: 'am·big·u·ous',
//     sounding: '/amˈbiɡyo͞oəs/',
//     spech: 'adjective',
//     definition:
//       '(of language) open to more than one interpretation; having a double meaning.',
//   },
//   {
//     word: 'Ambitious',
//     pronounciation: 'am·bi·tious',
//     sounding: '/amˈbiSHəs/',
//     spech: 'adjective',
//     definition:
//       'having or showing a strong desire and determination to succeed.',
//   },
//   {
//     word: 'Ambivalence',
//     pronounciation: 'am·biv·a·lence',
//     sounding: '/amˈbivələns/',
//     spech: 'noun',
//     definition:
//       'the state of having mixed feelings or contradictory ideas about something or someone.',
//   },
//   {
//     word: 'Analogous',
//     pronounciation: 'a·nal·o·gous',
//     sounding: 'a·nal·o·gous',
//     spech: 'adjective',
//     definition:
//       'comparable in certain respects, typically in a way which makes clearer the nature of the things compared.',
//   },
// ];

const FlashCardScreen = () => {
  const [card, setCard] = useState({});
  const [word, setWord] = useState({
    word: '',
    definition: '',
    speech: '',
    example: '',
    synonyms: [''],
  });
  const [errMsg, setErrMsg] = useState('');

  const newCard = async () => {
    const idx = Math.floor(Math.random() * words.length);
    // setCard(words[idx]);
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
      //   console.log(e);
    }
  };

  useEffect(() => {
    newCard();
  }, []);

  return (
    <View style={styles.container} elevation={10}>
      <Text style={styles.title}>Test your knowledge</Text>
      <FlashCard card={card} errMsg={errMsg} />

      <TouchableOpacity style={styles.nextButton} onPress={() => newCard()}>
        <Text style={styles.nextText}>Next Word</Text>
      </TouchableOpacity>
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
    margin: 10,
    color: 'grey',
    alignSelf: 'center',
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
  nextText: {
    color: 'white',
  },
});

export default FlashCardScreen;
