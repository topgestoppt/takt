import React from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { color, radius, space } from '../theme';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  accent?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PressableCard({ children, onPress, accent, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        accent ? styles.accent : styles.surface,
        pressed && (accent ? styles.accentPressed : styles.surfacePressed),
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'flex-start',
    borderRadius: radius.lg,
    padding: space[4],
    borderWidth: 1,
  },
  surface: { backgroundColor: color.surface, borderColor: color.neutral800 },
  surfacePressed: { backgroundColor: color.neutral900 },
  accent: { backgroundColor: color.accent900, borderColor: color.accent700 },
  accentPressed: { backgroundColor: color.accent800 },
});
