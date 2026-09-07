import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { color, font, radius, space } from '../theme';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  children: string;
  onPress?: () => void;
  variant?: Variant;
  block?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ children, onPress, variant = 'secondary', block, disabled, style }: Props) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        block && styles.block,
        pressed && !disabled && stylesPressed[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          (variant === 'primary' || variant === 'ghost') && { color: color.accent },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: space[2],
    paddingHorizontal: space[3] * 1.2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primary: { borderColor: color.accent },
  secondary: { borderColor: color.divider },
  ghost: { borderColor: 'transparent', paddingHorizontal: space[1] },
  block: { width: '100%' },
  disabled: { opacity: 0.45 },
  label: {
    fontFamily: font.heading,
    fontSize: 14,
    color: color.text,
  },
});

const stylesPressed = StyleSheet.create({
  primary: { backgroundColor: 'rgba(145,132,217,0.22)' },
  secondary: { backgroundColor: 'rgba(233,233,237,0.14)' },
  ghost: { backgroundColor: 'rgba(145,132,217,0.18)' },
});
