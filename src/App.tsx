import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import wheelImg from '../assets/wheel3.png';
import frameImg from '../assets/fortuna.png';

import QuizOfMithras from './components/QuizOfMithras';
import StarrySkyMystery from './components/StarrySkyMystery';
import FortuneWheel from './components/FortuneWheel';
import TwinklingStar from './components/TwinklingStar';
import useInactivityTimer from './useInactivityTimer';

export default function App() {
  const [currentGame, setCurrentGame] = useState<'quiz' | 'stars' | 'fortune' | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  // Lock to landscape on mount
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);

  // Get full-screen dimensions
  const { width, height } = useWindowDimensions();

  // Choose the smaller axis to base our wheel/frame size on,
  // then scale up for a big, tablet-filling UI.
  const baseSize = Math.min(width, height);
  const frameSize = baseSize * 0.9;       // 90% of the short side
  const wheelSize = frameSize * 0.8;      // 80% of the frame

  const touchHandlers = useInactivityTimer(
    () => setShowWarning(true),            // onWarn
    () => {
      setShowWarning(false);
      setCurrentGame(null);
    }
  );

  // Game screens
  if (currentGame === 'quiz') {
    return <QuizOfMithras onBack={() => setCurrentGame(null)} />;
  }
  if (currentGame === 'stars') {
    return <StarrySkyMystery onBack={() => setCurrentGame(null)} />;
  }
  if (currentGame === 'fortune') {
    return <FortuneWheel onBack={() => setCurrentGame(null)} />;
  }

  return (
    <View
      style={[styles.container, { width, height }]}
      {...touchHandlers}
    >
      {showWarning && (
        <Text style={styles.warningText}>
          You’ve been idle too long — returning to menu…
        </Text>
      )}

      {/* Frame & Wheel scaled to tablet landscape */}
      <Image
        source={frameImg}
        style={[
          styles.frame,
          { width: frameSize, height: frameSize },
        ]}
      />
      <Image
        source={wheelImg}
        style={[
          styles.wheel,
          { width: wheelSize, height: wheelSize },
        ]}
      />

      {/* Menu Buttons */}
      <View style={styles.buttonsContainer}>
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
      </View>

      {/* Twinkling Stars in the background */}
      <TwinklingStar />
      <TwinklingStar />
      <TwinklingStar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    position: 'absolute',
  },
  wheel: {
    marginBottom: 20,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    backgroundColor: '#fff4dc',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    zIndex: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#5a3e1b',
    fontWeight: 'bold',
  },
  warningText: {
    position: 'absolute',
    top: 20,
    fontSize: 16,
    color: '#a00',
  },
});
