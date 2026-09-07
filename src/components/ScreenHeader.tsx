import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RoundIconButton } from './RoundIconButton';
import { color, font } from '../theme';

type Props = {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function ScreenHeader({ title, onBack, right }: Props) {
  return (
    <View style={styles.row}>
      {onBack && <RoundIconButton icon="arrowLeft" onPress={onBack} />}
      <Text style={styles.title}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { flex: 1, fontFamily: font.heading, fontSize: 22, color: color.text },
});
