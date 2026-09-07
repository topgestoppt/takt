import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { color } from '../theme';

type Props = {
  on: boolean;
  onPress: () => void;
};

export function Toggle({ on, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.track,
        {
          backgroundColor: on ? color.accent900 : 'transparent',
          borderColor: on ? color.accent700 : color.neutral800,
          justifyContent: on ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View style={[styles.knob, { backgroundColor: on ? color.accent : color.neutral700 }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
});
