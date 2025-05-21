import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import TwinklingStar from './TwinklingStar';
import starSparkle from '../../assets/icons/star-sparkle.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const [found, setFound] = useState<{ name: string; x: number; y: number }[]>(
    []
  );
  const [activeConstellation, setActiveConstellation] = useState<
    Constellation & { clickX: number; clickY: number }
  >();
  const [showQuiz, setShowQuiz] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wrongClick, setWrongClick] = useState(false);

  // Handle taps on the sky
  const handlePress = (e: any) => {
    if (showQuiz || completed) return;

    const { locationX, locationY } = e.nativeEvent;
    const clickedX = (locationX / SCREEN_WIDTH) * 100;
    const clickedY = (locationY / SCREEN_HEIGHT) * 100;

    // find a constellation within ±10% and not yet found
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
      setFound((f) => [
        ...f,
        { name: activeConstellation.name, x: activeConstellation.clickX, y: activeConstellation.clickY },
      ]);
      setShowQuiz(false);
      setActiveConstellation(undefined);

      if (found.length + 1 === constellations.length) {
        setTimeout(() => setCompleted(true), 1000);
      }
    } else {
      // simple hint
      alert("Hint: Think about Mithra's symbolic battles.");
    }
  };

  if (completed) {
    return (
      <View style={styles.container}>
        <Text style={styles.finalTitle}>🌌 Welcome to the Mysteries of the Sky 🌌</Text>
        <Text style={styles.finalText}>
          As Mithras mastered the bull, so the stars shape our destiny.
        </Text>
        {/* Add any image or decoration here */}
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.btnText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Twinkling background */}
      {Array.from({ length: 80 }).map((_, i) => (
        <TwinklingStar key={i} />
      ))}

      {/* Sky touch area */}
      <Pressable
        style={[styles.sky, wrongClick && styles.wrongClick]}
        onPress={handlePress}
      >
        {!showQuiz && (
          <Text style={styles.instruction}>
            Find the constellations associated with Mithraism
          </Text>
        )}

        {/* Render found constellations */}
        {found.map(({ name, x, y }) => (
          <View key={name} style={[styles.constellation, { left: `${x}%`, top: `${y}%` }]}>
            <Image source={starSparkle} style={styles.sparkle} />
            {/* simple sparkle burst */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.particle,
                  {
                    left: `${x + (Math.random() - 0.5) * 5}%`,
                    top: `${y + (Math.random() - 0.5) * 5}%`,
                    opacity: Math.random(),
                  },
                ]}
              />
            ))}
          </View>
        ))}

        {/* Quiz overlay */}
        {showQuiz && activeConstellation && (
          <View style={styles.quizOverlay}>
            <Text style={styles.quizTitle}>{activeConstellation.name}</Text>
            <Text style={styles.quizQuestion}>{activeConstellation.question}</Text>
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
  sky: { flex: 1 },
  wrongClick: { backgroundColor: 'rgba(255,0,0,0.2)' },
  instruction: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  constellation: { position: 'absolute', width: 24, height: 24 },
  sparkle: { width: 24, height: 24 },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  quizOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  quizTitle: { fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: 10 },
  quizQuestion: { fontSize: 18, color: '#ddd', textAlign: 'center', marginBottom: 20 },
  optionBtn: {
    backgroundColor: '#fff4dc',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  btnText: { fontSize: 16, color: '#5a3e1b', textAlign: 'center' },
  backBtn: {
    backgroundColor: '#e0d4c3',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    margin: 16,
    alignSelf: 'center',
  },
  finalTitle: { color: '#fff', fontSize: 24, textAlign: 'center', marginTop: 40 },
  finalText: { color: '#ddd', fontSize: 18, textAlign: 'center', margin: 20 },
});
