import React, { useEffect, useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';

export default function TwinklingStar() {
  // 1) Get real-time screen size
  const { width, height } = useWindowDimensions();

  // 2) Generate a random position & delay once per component instance
  const top = useRef(Math.random() * height * 0.9).current;
  const left = useRef(Math.random() * width * 0.9).current;
  const delay = useRef(Math.random() * 5000).current;

  // 3) Opacity animation loop
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, opacity]);

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
