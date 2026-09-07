import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../theme';

type Props = {
  marginVertical?: number;
};

export function FadeRule({ marginVertical = 16 }: Props) {
  return (
    <LinearGradient
      colors={['transparent', color.neutral800, color.neutral800, 'transparent']}
      locations={[0, 0.2, 0.8, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ height: 1, marginVertical }}
    />
  );
}
