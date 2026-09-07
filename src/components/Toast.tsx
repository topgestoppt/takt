import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PhosphorIcon } from './PhosphorIcon';
import { color, elevation, font, radius } from '../theme';

type Props = {
  message: string;
};

export function Toast({ message }: Props) {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.toast}>
        <PhosphorIcon name="checkCircle" weight="fill" size={17} color={color.accent} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 88,
    alignItems: 'stretch',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: radius.lg,
    backgroundColor: color.neutral900,
    ...elevation.md,
  },
  text: {
    fontFamily: font.body,
    fontSize: 13,
    color: color.text,
    flexShrink: 1,
  },
});
