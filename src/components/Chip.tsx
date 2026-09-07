import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { chipTone, font, radius, space } from '../theme';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
  pill?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, active, onPress, pill, style }: Props) {
  const tone = chipTone(active);
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        pill && styles.pill,
        { backgroundColor: tone.bg, borderColor: tone.border },
        style,
      ]}
    >
      <Text style={[styles.label, { color: tone.color }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space[3],
  },
  pill: {
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 13,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: font.body,
    fontSize: 12,
  },
});
