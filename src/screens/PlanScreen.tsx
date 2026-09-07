import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { PressableCard } from '../components/PressableCard';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { PUSH_A_PLAN, TOTAL_PUSH_A_SETS, WEEK_PLAN } from '../data/exercises';
import { useApp } from '../state/AppContext';
import { color, font } from '../theme';

export function PlanScreen() {
  const navigation = useNavigation<any>();
  const { kgOf } = useApp();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>Woche 34 · Block 2</Text>
      <Text style={styles.title}>Trainingsplan</Text>

      <View style={styles.weekRow}>
        {WEEK_PLAN.map((d, i) => {
          const isToday = i === 0;
          const isRest = d.short === 'Ruhe';
          return (
            <View
              key={d.day}
              style={[
                styles.dayCell,
                { backgroundColor: isToday ? color.accent900 : 'transparent', borderColor: isToday ? color.accent700 : color.neutral800 },
              ]}
            >
              <Text style={styles.dayLabel}>{d.day}</Text>
              <Text style={[styles.dayShort, { color: isToday ? color.accent300 : isRest ? color.neutral600 : color.neutral300 }]}>
                {d.short}
              </Text>
            </View>
          );
        })}
      </View>

      <Card style={styles.todayCard}>
        <Text style={styles.todayKicker}>Heute</Text>
        <Text style={styles.todayTitle}>Push A — Brust, Schulter, Trizeps</Text>
        <Text style={styles.todayMeta}>6 Übungen · {TOTAL_PUSH_A_SETS} Sätze · ~55 Min · ca. 320 kcal</Text>
        <View style={styles.divider} />
        {PUSH_A_PLAN.map((e, i) => (
          <View key={e.name} style={styles.exRow}>
            <Text style={styles.exName}>{e.name}</Text>
            <Text style={styles.exPlan}>
              {e.sets} × {e.reps}
              {e.kg ? ` · ${String(kgOf(i)).replace('.', ',')} kg` : ' · KG'}
            </Text>
          </View>
        ))}
        <Button variant="primary" block style={styles.startBtn} onPress={() => navigation.navigate('Session')}>
          Workout starten
        </Button>
      </Card>

      <PressableCard style={styles.libraryBtn} onPress={() => navigation.navigate('Library')}>
        <View style={styles.libraryRow}>
          <PhosphorIcon name="books" size={19} color={color.neutral400} />
          <Text style={styles.libraryText}>Übungs-Bibliothek</Text>
          <PhosphorIcon name="caretRight" size={15} color={color.neutral600} />
        </View>
      </PressableCard>

      <Card padding={14} style={{ marginTop: 8 }}>
        <Text style={styles.nextTitle}>Nächste Einheit</Text>
        <Text style={styles.nextMeta}>Mi · Pull A — Rücken, Bizeps · 5 Übungen</Text>
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  content: { padding: 18, paddingTop: 16, paddingBottom: 40, gap: 8 },
  kicker: { fontFamily: font.body, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: color.neutral500 },
  title: { fontFamily: font.heading, fontSize: 22, color: color.text, marginTop: 4, marginBottom: 8 },
  weekRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  dayCell: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9, borderWidth: 1 },
  dayLabel: { fontFamily: font.body, fontSize: 10.5, color: color.neutral500 },
  dayShort: { fontFamily: font.body, fontSize: 12, marginTop: 5 },
  todayCard: { marginTop: 8 },
  todayKicker: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.accent300 },
  todayTitle: { fontFamily: font.body, fontSize: 19, color: color.text, marginTop: 5 },
  todayMeta: { fontFamily: font.body, fontSize: 12.5, color: color.neutral400, marginTop: 6 },
  divider: { height: 1, backgroundColor: color.neutral800, marginVertical: 14 },
  exRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, paddingVertical: 6 },
  exName: { fontFamily: font.body, fontSize: 13, color: color.neutral300 },
  exPlan: { fontFamily: font.body, fontSize: 13, color: color.neutral500 },
  startBtn: { marginTop: 16 },
  libraryBtn: { marginTop: 8, padding: 14 },
  libraryRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  libraryText: { flex: 1, fontFamily: font.body, fontSize: 14, color: color.text },
  nextTitle: { fontFamily: font.body, fontSize: 13.5, color: color.text },
  nextMeta: { fontFamily: font.body, fontSize: 12.5, color: color.neutral500, marginTop: 4 },
});
