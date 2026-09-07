import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { PhosphorIcon, type IconName } from './PhosphorIcon';
import { color } from '../theme';

type Props = {
  icon: IconName;
  onPress: () => void;
  size?: number;
};

export function RoundIconButton({ icon, onPress, size = 36 }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
        pressed && styles.pressed,
      ]}
    >
      <PhosphorIcon name={icon} size={16} color={color.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: color.neutral900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});
