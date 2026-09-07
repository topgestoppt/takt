import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color } from '../theme';

type Props = {
  pct: number; // 0-100
  trackColor?: string;
  fillColor?: string;
  height?: number;
};

export function ProgressBar({ pct, trackColor = color.neutral900, fillColor = color.accent, height = 4 }: Props) {
  return (
    <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          { width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: fillColor, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
  fill: { height: '100%' },
});
