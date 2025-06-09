import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import common from '../styles/common';
import crowIcon from '../../assets/icons/crow.png';
import ringIcon from '../../assets/icons/ring.png';
import cesarIcon from '../../assets/icons/cesar.png';
import lionIcon from '../../assets/icons/lion.png';
import starsIcon from '../../assets/icons/stars.png';

interface Props {
  onBack: () => void;
}

type Stage = {
  name: string;
  symbol: string;
  icon?: any;
  question: string;
  options: string[];
  answer: string;
};

const stages: Stage[] = [
  { name: 'Corax',     symbol: '🐦', icon: crowIcon,    question: 'What creature is associated with the Corax stage?',     options: ['Crow', 'Bull', 'Lion'], answer: 'Crow' },
  { name: 'Nymphus',   symbol: '💍', icon: ringIcon,    question: 'What does the Nymphus stage represent?',                  options: ['Sun', 'War', 'Marriage'], answer: 'Marriage' },
  { name: 'Miles',     symbol: '⚔️', icon: cesarIcon,   question: 'What is a Miles in Mithraism?',                             options: ['A farmer', 'A priest', 'A soldier'], answer: 'A soldier' },
  { name: 'Leo',       symbol: '🦁', icon: lionIcon,    question: 'Which element is associated with Leo?',                       options: ['Fire', 'Water', 'Earth'], answer: 'Fire' },
  { name: 'Perses',    symbol: '🌑',                    question: 'What does Perses symbolize?',                                options: ['Moon', 'Star Wisdom', 'Darkness'], answer: 'Star Wisdom' },
  { name: 'Heliodromus',symbol: '☀️', icon: starsIcon,  question: 'What is the role of Heliodromus?',                           options: ['Bull Slayer', 'Moon Watcher', 'Sun Runner'], answer: 'Sun Runner' },
  { name: 'Pater',     symbol: '🧙',                    question: 'What happens at the Pater stage?',                           options: ['War', 'Sacrifice', 'Enlightenment'], answer: 'Enlightenment' },
];

export default function QuizOfMithras({ onBack }: Props) {
  const [stageIndex, setStageIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { width, height } = useWindowDimensions();

  // Determine scale for tablet vs phone
  const isTablet = width > 700;
  const scale = isTablet ? 1.5 : 1;

  const current = stages[stageIndex];

  const handleAnswer = (option: string) => {
    const correct = option === current.answer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      if (correct) {
        setStageIndex(prev => prev + 1);
      }
      setShowResult(false);
    }, 2000);
  };

  // Generate random sparkles once per size change
  const sparkles = useMemo(
    () =>
      Array.from({ length: isTablet ? 20 : 10 }).map((_, idx) => {
        const top = Math.random() * height;
        const left = Math.random() * width;
        return { key: idx, style: { position: 'absolute' as const, top, left, opacity: 0.8 } };
      }),
    [width, height]
  );

  // Dynamic sizes
  const questionFont = 24 * scale;
  const resultFont = 20 * scale;
  const buttonPaddingV = 12 * scale;
  const buttonPaddingH = 16 * scale;
  const backButtonWidth = isTablet ? width * 0.3 : width * 0.5;

  return (
    <View style={[common.container, { width, height }]}>      
      {stageIndex < stages.length ? (
        <>
          <View style={[common.stepper, isTablet && { marginVertical: 20 * scale }]}>            
            {stages.map((stage, index) => (
              <View key={index} style={common.stepWrapper}>
                <View
                  style={[
                    common.step,
                    index <= stageIndex ? common.activeStep : common.inactiveStep,
                    isTablet && { padding: 16 * scale },
                  ]}
                >
                  {stage.icon ? (
                    <Image
                      source={stage.icon}
                      style={[common.stepSymbol, { width: 32 * scale, height: 32 * scale }]}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={[common.stepSymbol, { fontSize: 18 * scale }]}>
                      {stage.symbol}
                    </Text>
                  )}
                  <Text style={[common.stepName, { fontSize: 14 * scale }]}>
                    {stage.name}
                  </Text>
                </View>
                {index < stages.length - 1 && (
                  <View
                    style={[
                      common.connector,
                      index < stageIndex ? common.activeLine : common.inactiveLine,
                      isTablet && { height: 4 * scale },
                    ]}
                  />
                )}
              </View>
            ))}
            {sparkles.map(s => (
              <View key={s.key} style={[common.sparkle, s.style]} />
            ))}
          </View>

          <Text style={[
              styles.question,
              { fontSize: questionFont, marginHorizontal: 20 * scale }
            ]}
          >
            {current.question}
          </Text>
          <View style={[styles.optionsContainer, isTablet && { marginBottom: 30 * scale }]}>            
            {current.options.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  common.optionBtn,
                  { paddingVertical: buttonPaddingV, paddingHorizontal: buttonPaddingH }
                ]}
                onPress={() => handleAnswer(opt)}
              >
                <Text style={[common.btnText, { fontSize: 16 * scale }]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {showResult && (
            <Text
              style={[
                styles.result,
                isCorrect ? styles.correct : styles.wrong,
                { fontSize: resultFont }
              ]}
            >
              {isCorrect
                ? 'Correct! Proceed to the next stage.'
                : 'Incorrect... Try again!'}
            </Text>
          )}
        </>
      ) : (
        <View style={common.finalStage}>
          <Text style={[common.finalTitle, isTablet && { fontSize: 32 * scale }]}>
            🌟 You are now a PATER of the Mysteries 🌟
          </Text>
          <Text style={[common.finalText, isTablet && { fontSize: 20 * scale }]}>
            The torch is passed. The stars align. You wear the golden cloak of wisdom.
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={onBack}
        style={[
          common.backButton,
          { width: backButtonWidth, paddingVertical: buttonPaddingV }
        ]}
      >
        <Text style={[common.btnText, { fontSize: 16 * scale }]}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    color: '#4a3b2c',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  result: {
    textAlign: 'center',
    marginTop: 20,
  },
  correct: {
    color: 'green',
  },
  wrong: {
    color: 'red',
  },
});