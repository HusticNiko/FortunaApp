import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import common from '../styles/common';
import crowIcon from '../../assets/icons/crow.png';
import ringIcon from '../../assets/icons/ring.png';
import cesarIcon from '../../assets/icons/cesar.png';
import lionIcon from '../../assets/icons/lion.png';
import starsIcon from '../../assets/icons/stars.png';

interface Props { onBack: () => void; }

type Stage = {
  name: string;
  symbol: string;
  icon?: any;
  question: string;
  options: string[];
  answer: string;
};

const stages: Stage[] = [
  { name: 'Corax', symbol: '🐦', icon: crowIcon, question: 'What creature is associated with the Corax stage?', options: ['Crow', 'Bull', 'Lion'], answer: 'Crow' },
  { name: 'Nymphus', symbol: '💍', icon: ringIcon, question: 'What does the Nymphus stage represent?', options: ['Sun', 'War', 'Marriage'], answer: 'Marriage' },
  { name: 'Miles', symbol: '⚔️', icon: cesarIcon, question: 'What is a Miles in Mithraism?', options: ['A farmer', 'A priest', 'A soldier'], answer: 'A soldier' },
  { name: 'Leo', symbol: '🦁', icon: lionIcon, question: 'Which element is associated with Leo?', options: ['Fire', 'Water', 'Earth'], answer: 'Fire' },
  { name: 'Perses', symbol: '🌑', question: 'What does Perses symbolize?', options: ['Moon', 'Star Wisdom', 'Darkness'], answer: 'Star Wisdom' },
  { name: 'Heliodromus', symbol: '☀️', icon: starsIcon, question: 'What is the role of Heliodromus?', options: ['Bull Slayer', 'Moon Watcher', 'Sun Runner'], answer: 'Sun Runner' },
  { name: 'Pater', symbol: '🧙', question: 'What happens at the Pater stage?', options: ['War', 'Sacrifice', 'Enlightenment'], answer: 'Enlightenment' }
];

export default function QuizOfMithras({ onBack }: Props) {
  const [stageIndex, setStageIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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

  // Random sparkles for stepper background
  const sparkles = Array.from({ length: 10 }).map((_, idx) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 5000;
    return { key: idx, style: { position: 'absolute', top: `${top}%`, left: `${left}%`, opacity: 0.8 } };
  });

  return (
    <View style={common.container}>
      {stageIndex < stages.length ? (
        <>
          <View style={common.stepper}>
            {stages.map((stage, index) => (
              <View key={index} style={common.stepWrapper}>
                <View style={[common.step, index <= stageIndex ? common.activeStep : common.inactiveStep]}>
                  {stage.icon && (
                    <Image source={stage.icon} style={common.stepSymbol} />
                  )}
                  {!stage.icon && (
                    <Text style={common.stepSymbol}>{stage.symbol}</Text>
                  )}
                  <Text style={common.stepName}>{stage.name}</Text>
                </View>
                {index < stages.length - 1 && (
                  <View style={[common.connector, index < stageIndex ? common.activeLine : common.inactiveLine]} />
                )}
              </View>
            ))}
            {sparkles.map(s => (
              <View key={s.key} style={[common.sparkle, s.style]} />
            ))}
          </View>

          <Text style={styles.question}>{current.question}</Text>
          <View>
            {current.options.map(opt => (
              <TouchableOpacity key={opt} style={common.optionBtn} onPress={() => handleAnswer(opt)}>
                <Text style={common.btnText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {showResult && (
            <Text style={[styles.result, isCorrect ? styles.correct : styles.wrong]}> 
              {isCorrect ? 'Correct! Proceed to the next stage.' : 'Incorrect... Try again!'}
            </Text>
          )}
        </>
      ) : (
        <View style={common.finalStage}>
          <Text style={common.finalTitle}>🌟 You are now a PATER of the Mysteries 🌟</Text>
          <Text style={common.finalText}>The torch is passed. The stars align. You wear the golden cloak of wisdom.</Text>
        </View>
      )}

      <TouchableOpacity onPress={onBack} style={common.backButton}>
        <Text style={common.btnText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  question: {
    fontSize: 24,
    color: '#4a3b2c',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  correct: { color: 'green' },
  wrong: { color: 'red' },
});
