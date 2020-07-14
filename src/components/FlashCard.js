import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const FlashCard = ({ card, errMsg, front, toggleFront }) => {
  const frontCard = (
    <View style={styles.frontCardContainer}>
      {errMsg.length > 2 ? (
        <>
          <MaterialIcons style={styles.errIcon} name="error-outline" />
          <Text style={styles.errMsg}>{errMsg}</Text>
        </>
      ) : (
        <Text style={styles.word} onPress={() => toggleFront()}>
          {card.word}
        </Text>
      )}
    </View>
  );

  const backCard = (
    <ScrollView
      style={styles.backCardContainer}
      showsVerticalScrollIndicator={false}
    >
      {errMsg.length > 2 ? (
        <View>
          <MaterialIcons style={styles.errIcon} name="error-outline" />
          <Text>{errMsg}</Text>
        </View>
      ) : (
        <>
          <View style={styles.wordContainer}>
            <Text style={styles.word} onPress={() => toggleFront()}>
              {card.word}
            </Text>
            <Text style={styles.speech}>{card.speech}</Text>
          </View>
          <Text style={styles.definition}>{card.definition}</Text>
          <Text style={styles.example}>Usage: "{card.example}"</Text>
          <Text style={styles.synonym}>
            Similar: {card.synonyms.join(', ')}
          </Text>
        </>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.cardContainer}>{front ? frontCard : backCard}</View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    height: 250,
    margin: 10,
    marginTop: 30,
    borderRadius: 15,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },

  errIcon: {
    fontSize: 80,
    color: 'red',
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
    fontSize: 16,
    lineHeight: 20,
  },
  synonym: {
    fontSize: 16,
    color: 'grey',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5,
  },
  example: {
    fontSize: 16,
    color: 'grey',
    fontStyle: 'italic',
    marginTop: 20,
    marginBottom: 5,
  },
  errMsg: {
    color: 'red',
    fontSize: 25,
  },
});

export default FlashCard;
