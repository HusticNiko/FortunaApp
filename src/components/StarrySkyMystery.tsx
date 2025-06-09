import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import TwinklingStar from './TwinklingStar';
import starSparkle from '../../assets/icons/star-sparkle.png';

type Constellation = {
  name: string;
  question: string;
  options: string[];
  answer: string;
  x: number; // percent
  y: number; // percent
};

const constellations: Constellation[] = [
  {
    name: 'Taurus',
    question: 'What does Taurus represent in Mithraism?',
    options: ['The Bull of Heaven', 'Messenger of the Moon', 'God of War'],
    answer: 'The Bull of Heaven',
    x: 30,
    y: 40,
  },
  {
    name: 'Canis Major',
    question: 'What is Canis Major associated with?',
    options: ['Guardian of the Bull', 'Star of the King', 'Solar Chariot'],
    answer: 'Guardian of the Bull',
    x: 70,
    y: 60,
  },
  // …add more…
];

interface Props {
  onBack: () => void;
}

export default function StarrySkyMystery({ onBack }: Props) {
  // 1) Lock into landscape
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);

  // 2) Get real-time screen size
  const { width, height } = useWindowDimensions();

  const [found, setFound] = useState<
    { name: string; x: number; y: number }[]
  >([]);
  const [activeConstellation, setActiveConstellation] = useState<
    (Constellation & { clickX: number; clickY: number }) | undefined
  >(undefined);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wrongClick, setWrongClick] = useState(false);

  // 3) Handle taps in pixel space, then convert to percent
  const handlePress = (e: any) => {
    if (showQuiz || completed) return;
    const { locationX, locationY } = e.nativeEvent;
    const clickedX = (locationX / width) * 100;
    const clickedY = (locationY / height) * 100;

    const foundConst = constellations.find(
      (c) =>
        Math.abs(c.x - clickedX) < 10 &&
        Math.abs(c.y - clickedY) < 10 &&
        !found.some((f) => f.name === c.name)
    );
    if (foundConst) {
      setActiveConstellation({ ...foundConst, clickX: clickedX, clickY: clickedY });
      setShowQuiz(true);
    } else {
      setWrongClick(true);
      setTimeout(() => setWrongClick(false), 600);
    }
  };

  const handleAnswer = (option: string) => {
    if (!activeConstellation) return;
    if (option === activeConstellation.answer) {
      setFound((prev) => [
        ...prev,
        {
          name: activeConstellation.name,
          x: activeConstellation.clickX,
          y: activeConstellation.clickY,
        },
      ]);
      setShowQuiz(false);
      setActiveConstellation(undefined);
      if (found.length + 1 === constellations.length) {
        setTimeout(() => setCompleted(true), 1000);
      }
    } else {
      alert("Hint: Think about Mithra's symbolic battles.");
    }
  };

  // 4) Completed screen
  if (completed) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.finalTitle}>🌌 Welcome to the Mysteries of the Sky 🌌</Text>
        <Text style={styles.finalText}>
          As Mithras mastered the bull, so the stars shape our destiny.
        </Text>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.btnText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 5) Main interactive sky
  return (
    <View style={[styles.container, { width, height }]}>
      {/* Twinkling background */}
      {Array.from({ length: 80 }).map((_, i) => (
        <TwinklingStar key={i} />
      ))}

      <Pressable
        style={[
          styles.sky,
          { width, height },
          wrongClick && styles.wrongClick,
        ]}
        onPress={handlePress}
      >
        {!showQuiz && (
          <Text style={styles.instruction}>
            Find the constellations associated with Mithraism
          </Text>
        )}

        {/* Show found constellations at computed pixel positions */}
        {found.map(({ name, x, y }) => {
          const px = (x / 100) * width;
          const py = (y / 100) * height;
          return (
            <View key={name} style={[styles.constellation, { left: px, top: py }]}>
              <Image source={starSparkle} style={styles.sparkle} />
              {Array.from({ length: 5 }).map((_, idx) => {
                // random burst around the constellation
                const rx = px + (Math.random() - 0.5) * 0.1 * width;
                const ry = py + (Math.random() - 0.5) * 0.1 * height;
                return (
                  <View
                    key={idx}
                    style={[
                      styles.particle,
                      { left: rx, top: ry, opacity: Math.random() },
                    ]}
                  />
                );
              })}
            </View>
          );
        })}

        {/* Quiz overlay */}
        {showQuiz && activeConstellation && (
          <View style={styles.quizOverlay}>
            <Text style={styles.quizTitle}>{activeConstellation.name}</Text>
            <Text style={styles.quizQuestion}>
              {activeConstellation.question}
            </Text>
            {activeConstellation.options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.optionBtn}
                onPress={() => handleAnswer(opt)}
              >
                <Text style={styles.btnText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Pressable>

      {/* Back button */}
      {!showQuiz && !completed && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.btnText}>Back to Menu</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  sky: { position: 'absolute' },
  wrongClick: { backgroundColor: 'rgba(255,0,0,0.2)' },
  instruction: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  constellation: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
  sparkle: { width: 32, height: 32 },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  quizOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  quizTitle: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  quizQuestion: {
    fontSize: 20,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionBtn: {
    backgroundColor: '#fff4dc',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    marginVertical: 6,
  },
  btnText: { fontSize: 16, color: '#5a3e1b', textAlign: 'center' },
  backBtn: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#e0d4c3',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
  },
  finalTitle: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 40,
  },
  finalText: {
    color: '#ddd',
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});
