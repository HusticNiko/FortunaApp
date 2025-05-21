import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function TwinklingStar() {
  const opacity = useRef(new Animated.Value(0)).current;
  const top = Math.random() * height * 0.9;
  const left = Math.random() * width * 0.9;
  const delay = Math.random() * 5000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top,
        left,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        opacity,
      }}
    />
  );
}
