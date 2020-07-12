import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FlashCard = ({ card, errMsg }) => {
  const [front, setFront] = useState(true);

  const toggleFront = () => {
    setFront(!front);
  };

  const frontCard = (
    <View style={styles.frontCardContainer}>
      {errMsg.length.length < 2 ? (
        <Text>{errMsg.length}</Text>
      ) : (
        <Text style={styles.word}>{card.word}</Text>
      )}
    </View>
  );
  const backCard = (
    <View style={styles.backCardContainer}>
      {errMsg.length < 2 ? (
        <Text>{errMsg}</Text>
      ) : (
        <>
          <View style={styles.wordContainer}>
            <Text style={styles.word}>{card.word}</Text>
            <Text style={styles.speech}>{card.speech}</Text>
          </View>
          <Text style={styles.definition}>{card.definition}</Text>
          <Text style={styles.example}>Usage: "{card.example}"</Text>
          <Text style={styles.synonym}>Similar: {card.synonyms[0]}</Text>
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => toggleFront()}
    >
      {front ? frontCard : backCard}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    height: 250,
    margin: 10,
    borderRadius: 15,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  word: {
    fontSize: 35,
    color: '#5482ff',
  },
  frontCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCardContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  wordContainer: {
    marginBottom: 0,
  },
  sounding: {
    color: 'grey',
    marginTop: 5,
    fontSize: 20,
    marginBottom: 10,
  },
  speech: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'grey',
  },
  definition: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 30,
  },
  synonym: {
    fontSize: 16,
    color: 'grey',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
  },
  example: {
    fontSize: 16,
    color: 'grey',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default FlashCard;
