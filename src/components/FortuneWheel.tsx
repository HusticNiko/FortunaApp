import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

// Replace these with your actual asset imports
import wheelImage from '../../assets/wheel3.png';
import frameImage from '../../assets/fortuna.png';

interface Props {
  onBack: () => void;
}

export default function FortuneWheel({ onBack }: Props) {
  const fortunes = [
    'Fortuna smiles upon your endeavors.',
    'A twist of fate is near, be ready.',
    'A golden opportunity lies ahead.',
    'Tread carefully, luck is a double-edged sword.',
    'Your path is favored by the gods.',
    'Expect the unexpected. Fortuna sees all.',
    'Now is the time to take a bold leap.',
    'You are guided by unseen forces of prosperity.',
  ];

  const [isSpinning, setIsSpinning] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [selectedFortune, setSelectedFortune] = useState<string>('');

  // Animated value & ref to track the last rotation
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const rotationValueRef = useRef(0);
  rotationAnim.addListener(({ value }) => {
    rotationValueRef.current = value;
  });

  const spinWheel = () => {
    if (isSpinning) return;

    const index = Math.floor(Math.random() * fortunes.length);
    const anglePerFortune = 360 / fortunes.length;
    const spins = 5; // 5 full spins
    const targetAngle =
      (360 - index * anglePerFortune - anglePerFortune / 2) % 360;
    const additionalRotation = spins * 360 + targetAngle;
    const newRotation = rotationValueRef.current + additionalRotation;

    setIsSpinning(true);
    setShowFortune(false);

    Animated.timing(rotationAnim, {
      toValue: newRotation,
      duration: 5000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setSelectedFortune(fortunes[index]);
      setShowFortune(true);
      setIsSpinning(false);
    });
  };

  // Interpolate to handle >360deg values
  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'extend',
  });

  return (
    <View style={styles.container}>
      <Image source={frameImage} style={styles.frame} />
      <Animated.Image
        source={wheelImage}
        style={[styles.wheel, { transform: [{ rotate: rotateInterpolate }] }]}
      />

      {showFortune && (
        <TouchableOpacity style={styles.overlay} onPress={spinWheel}>
          <View style={styles.fortuneBox}>
            <Text style={styles.fortuneText}>{selectedFortune}</Text>
            <Text style={styles.tapText}>(Tap to spin again)</Text>
          </View>
        </TouchableOpacity>
      )}

      {!showFortune && !isSpinning && (
        <TouchableOpacity
          onPress={spinWheel}
          style={[styles.button, styles.spinBtn]}
        >
          <Text style={styles.buttonText}>Spin the Wheel</Text>
        </TouchableOpacity>
      )}

      {isSpinning && (
        <TouchableOpacity onPress={onBack} style={[styles.button, styles.back]}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      )}
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
    width: 300,
    height: 300,
  },
  wheel: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fortuneBox: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 12,
    maxWidth: '80%',
  },
  fortuneText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  tapText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  spinBtn: {
    backgroundColor: '#fff4dc',
    borderColor: '#c3a574',
    borderWidth: 2,
  },
  back: {
    backgroundColor: '#e0d4c3',
    borderColor: '#c3a574',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    color: '#5a3e1b',
    fontWeight: '600',
  },
});
