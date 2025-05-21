import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import wheelImg from '../assets/wheel3.png';
import frameImg from '../assets/fortuna.png';
import QuizOfMithras from './components/QuizOfMithras';
import StarrySkyMystery from './components/StarrySkyMystery';
import useInactivityTimer from './useInactivityTimer';
import TwinklingStar from './components/TwinklingStar';
import FortuneWheel from './components/FortuneWheel';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    position: 'absolute',
    width: 300,
    height: 300,
  },
  wheel: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff4dc',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 8,
    zIndex: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#5a3e1b',
    fontWeight: 'bold',
  },
  warningText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
    color: '#a00',
  },
});

export default function App() {
  const [currentGame, setCurrentGame] = useState<'quiz' | 'stars' | 'fortune' | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const touchHandlers = useInactivityTimer(
    () => setShowWarning(true),               // onWarn
    () => {
      setShowWarning(false);
      // e.g. navigate back to menu, reset game, etc.
    }
  );


  if (currentGame === 'quiz') {
    return (
      <QuizOfMithras onBack={() => setCurrentGame(null)} />
    );
  }

  if (currentGame === 'stars') {
    return (
      <StarrySkyMystery onBack={() => setCurrentGame(null)} />
    );
  }

  if (currentGame === 'fortune') {
        return <FortuneWheel onBack={() => setCurrentGame(null)} />;
  }

  return (
<View style={styles.container} {...touchHandlers}>
      {showWarning && (
        <Text style={styles.warningText}>
          You’ve been idle too long — returning to menu…
        </Text>
      )}      <Image source={frameImg} style={styles.frame} />
      <Image source={wheelImg} style={styles.wheel} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentGame('quiz')}
      >
        <Text style={styles.buttonText}>Quiz of Mithras</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentGame('stars')}
      >
        <Text style={styles.buttonText}>Starry Sky Mystery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentGame('fortune')}
      >
        <Text style={styles.buttonText}>Fortune Wheel</Text>
      </TouchableOpacity>
      {showWarning && (
        <Text style={styles.warningText}>
          You’ve been idle too long. Returning to menu…
        </Text>
      )}
      <TwinklingStar />
      <TwinklingStar />
      <TwinklingStar />
      {/* add as many as you like */}
    </View>
  );
}
