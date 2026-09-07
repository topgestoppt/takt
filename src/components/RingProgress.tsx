import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { color, font } from '../theme';

type Props = {
  size?: number;
  pct: number; // 0-1
  value: string;
  label: string;
};

const R = 44;
const CIRC = 2 * Math.PI * R;

export function RingProgress({ size = 104, pct, value, label }: Props) {
  const dash = Math.max(0, Math.min(1, pct)) * CIRC;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 104 104" style={styles.svg}>
        <Circle cx={52} cy={52} r={R} fill="none" stroke={color.neutral900} strokeWidth={9} />
        <Circle
          cx={52}
          cy={52}
          r={R}
          fill="none"
          stroke={color.accent}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={`${dash.toFixed(1)} ${CIRC.toFixed(1)}`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.center}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.label}>kcal übrig</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svg: { transform: [{ rotate: '-90deg' }] },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  value: { fontFamily: font.heading, fontSize: 24, color: color.text, lineHeight: 28 },
  label: {
    fontFamily: font.body,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: color.neutral500,
    marginTop: 3,
  },
});
