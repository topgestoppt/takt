import React, { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { ProgressBar } from '../components/ProgressBar';
import { PUSH_A_PLAN, TOTAL_PUSH_A_SETS } from '../data/exercises';
import { useApp } from '../state/AppContext';
import { color, font } from '../theme';

export function SessionScreen() {
  const navigation = useNavigation<any>();
  const { doneSets, toggleSet, kgOf, bumpKg, doneCount, restSeconds, finishWorkout } = useApp();
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useFocusEffect(
    useCallback(() => {
      intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [])
  );

  const elapsedLabel = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')} Min`;
  const restLabel = `${Math.floor(restSeconds / 60)}:${String(restSeconds % 60).padStart(2, '0')}`;
  const sessionPct = (doneCount / TOTAL_PUSH_A_SETS) * 100;

  const finish = () => {
    finishWorkout();
    navigation.navigate('Tabs', { screen: 'Dashboard' });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          style={styles.closeBtn}
          onPress={() => navigation.navigate('Tabs', { screen: 'Training', params: { screen: 'Plan' } })}
        >
          <PhosphorIcon name="x" size={16} color={color.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Push A</Text>
          <Text style={styles.subtitle}>
            {doneCount} von {TOTAL_PUSH_A_SETS} Sätzen · {elapsedLabel}
          </Text>
        </View>
        {restSeconds > 0 && (
          <View style={styles.restBadge}>
            <PhosphorIcon name="timer" size={14} color={color.accent300} />
            <Text style={styles.restText}>{restLabel}</Text>
          </View>
        )}
      </View>

      <View style={styles.progressWrap}>
        <ProgressBar pct={sessionPct} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {PUSH_A_PLAN.map((e, ei) => (
          <Card key={e.name} style={styles.exCard}>
            <View style={styles.exHeader}>
              <Text style={styles.exName}>{e.name}</Text>
              <Text style={styles.exPlan}>
                {e.sets} × {e.reps}
              </Text>
            </View>
            <View style={styles.setsList}>
              {Array.from({ length: e.sets }, (_, si) => {
                const key = `${ei}-${si}`;
                const on = !!doneSets[key];
                return (
                  <View key={si} style={styles.setRow}>
                    <Text style={styles.setN}>{si + 1}</Text>
                    <View style={styles.setControls}>
                      <Pressable style={styles.stepBtn} onPress={() => bumpKg(ei, -2.5)}>
                        <Text style={styles.stepBtnText}>−</Text>
                      </Pressable>
                      <Text style={styles.kgText}>{String(kgOf(ei)).replace('.', ',')} kg</Text>
                      <Pressable style={styles.stepBtn} onPress={() => bumpKg(ei, 2.5)}>
                        <Text style={styles.stepBtnText}>+</Text>
                      </Pressable>
                      <View style={styles.miniDivider} />
                      <Text style={styles.repsText}>{e.reps} Wdh.</Text>
                    </View>
                    <Pressable
                      style={[
                        styles.checkBtn,
                        { borderColor: on ? color.accent700 : color.neutral800, backgroundColor: on ? color.accent900 : 'transparent' },
                      ]}
                      onPress={() => toggleSet(ei, si)}
                    >
                      <PhosphorIcon name="check" weight={on ? 'fill' : 'regular'} size={17} color={on ? color.accent300 : '#595d6c'} />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </Card>
        ))}
        <Button variant="primary" block style={styles.finishBtn} onPress={finish}>
          Workout beenden
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, paddingTop: 18 },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: color.neutral900,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: font.body, fontSize: 15, color: color.text },
  subtitle: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500 },
  restBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 12,
    borderRadius: 20, backgroundColor: color.accent900, borderWidth: 1, borderColor: color.accent700,
  },
  restText: { fontFamily: font.body, fontSize: 13, color: color.accent300 },
  progressWrap: { paddingHorizontal: 18, paddingTop: 12 },
  list: { padding: 18, paddingBottom: 40, gap: 10 },
  exCard: {},
  exHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  exName: { fontFamily: font.body, fontSize: 14.5, color: color.text },
  exPlan: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500 },
  setsList: { marginTop: 12, gap: 7 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  setN: { width: 20, fontFamily: font.body, fontSize: 12, color: color.neutral600 },
  setControls: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepBtn: {
    width: 28, height: 28, borderRadius: 7, backgroundColor: color.neutral900,
    alignItems: 'center', justifyContent: 'center',
  },
  stepBtnText: { fontFamily: font.body, fontSize: 14, color: color.neutral300 },
  kgText: { minWidth: 64, textAlign: 'center', fontFamily: font.body, fontSize: 13.5, color: color.text },
  miniDivider: { width: 1, height: 18, backgroundColor: color.neutral800, marginHorizontal: 2 },
  repsText: { fontFamily: font.body, fontSize: 13.5, color: color.neutral400 },
  checkBtn: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  finishBtn: { marginTop: 4 },
});
