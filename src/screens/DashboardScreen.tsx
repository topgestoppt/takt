import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { FadeRule } from '../components/FadeRule';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { RingProgress } from '../components/RingProgress';
import { ProgressBar } from '../components/ProgressBar';
import { PressableCard } from '../components/PressableCard';
import { fmt, MEAL_NAMES, useApp } from '../state/AppContext';
import { color, font } from '../theme';

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { entries, consumed, budget, remaining, bonusOn, pct } = useApp();

  const sum = (key: 'protein' | 'carbs' | 'fat') => entries.reduce((a, e) => a + e[key], 0);
  const macros = [
    { label: 'Protein', value: sum('protein'), goal: 165, color: color.accent },
    { label: 'KH', value: sum('carbs'), goal: 210, color: '#7972a9' },
    { label: 'Fett', value: sum('fat'), goal: 68, color: color.neutral500 },
  ];

  const mealGroups = MEAL_NAMES.map(({ name, icon }) => {
    const items = entries.filter((e) => e.meal === name);
    return { name, icon, kcal: items.reduce((a, e) => a + e.kcal, 0), items };
  });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>Montag, 7. Sept.</Text>
          <Text style={styles.greeting}>Moin, Jonas</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JB</Text>
        </View>
      </View>
      <FadeRule marginVertical={16} />

      <Card style={styles.budgetCard}>
        <RingProgress pct={pct} value={fmt(remaining)} label="kcal übrig" />
        <View style={styles.budgetInfo}>
          <Row label="Budget" value={`${fmt(budget)} kcal`} />
          <Row label="Gegessen" value={`${fmt(consumed)} kcal`} />
          <View style={styles.bonusBadge}>
            <PhosphorIcon name="lightning" weight="fill" size={14} color={color.accent} />
            <Text style={styles.bonusText}>
              {bonusOn
                ? '+320 kcal Trainingsbonus aus Push A'
                : 'Heute Push A geplant — Bonus wird nach dem Training frei'}
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.macroRow}>
        {macros.map((m) => (
          <Card key={m.label} padding={12} style={styles.macroCard}>
            <Text style={styles.macroLabel}>{m.label}</Text>
            <Text style={styles.macroValue}>
              {m.value}
              <Text style={styles.macroGoal}> / {m.goal} g</Text>
            </Text>
            <ProgressBar pct={Math.min(100, (m.value / m.goal) * 100)} fillColor={m.color} />
          </Card>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <PressableCard
          accent
          style={styles.actionCard}
          onPress={() => navigation.navigate('Session')}
        >
          <PhosphorIcon name="barbell" size={20} color={color.accent} />
          <Text style={styles.actionTitle}>Push A starten</Text>
          <Text style={styles.actionSub}>6 Übungen · ~55 Min</Text>
        </PressableCard>
        <PressableCard style={styles.actionCard} onPress={() => navigation.navigate('Scan')}>
          <PhosphorIcon name="barcode" size={20} color={color.neutral400} />
          <Text style={styles.actionTitle}>Barcode scannen</Text>
          <Text style={styles.actionSub}>Produkt in 2 Sek.</Text>
        </PressableCard>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Heute gegessen</Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Essen', { screen: 'Log' })}
        >
          Hinzufügen
        </Text>
      </View>

      <View style={styles.mealList}>
        {mealGroups.map((g) => (
          <Card key={g.name} padding={12} style={{ paddingHorizontal: 14 }}>
            <View style={styles.mealHeaderRow}>
              <View style={styles.mealHeaderLeft}>
                <PhosphorIcon name={g.icon} size={15} color={color.neutral500} />
                <Text style={styles.mealName}>{g.name}</Text>
              </View>
              <Text style={styles.mealKcal}>{fmt(g.kcal)} kcal</Text>
            </View>
            {g.items.map((it, idx) => (
              <View key={idx} style={styles.mealItemRow}>
                <Text style={styles.mealItemName} numberOfLines={1}>
                  {it.name} · {it.portion}
                </Text>
                <Text style={styles.mealItemKcal}>{it.kcal}</Text>
              </View>
            ))}
          </Card>
        ))}
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statCell}>
          <Text style={styles.statLabel}>Schritte</Text>
          <Text style={styles.statValue}>8.412</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCell}>
          <Text style={styles.statLabel}>Volumen / Woche</Text>
          <Text style={styles.statValue}>28,4 t</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={[styles.statCell, { flex: 0, alignItems: 'flex-end' }]}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={[styles.statValue, { color: color.accent300 }]}>12</Text>
        </View>
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  content: { padding: 18, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  kicker: { fontFamily: font.body, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: color.neutral500 },
  greeting: { fontFamily: font.heading, fontSize: 26, color: color.text, marginTop: 4 },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: color.accent900,
    borderWidth: 1, borderColor: color.accent700, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: font.body, fontSize: 13, color: color.accent300 },
  budgetCard: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  budgetInfo: { flex: 1, gap: 9 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { fontFamily: font.body, fontSize: 13, color: color.neutral400 },
  rowValue: { fontFamily: font.body, fontSize: 13, color: color.text },
  bonusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2,
    paddingVertical: 7, paddingHorizontal: 9, borderRadius: 8,
    backgroundColor: color.accent900, borderWidth: 1, borderColor: color.accent800,
  },
  bonusText: { fontFamily: font.body, fontSize: 11.5, lineHeight: 15, color: color.accent300, flexShrink: 1 },
  macroRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  macroCard: { flex: 1 },
  macroLabel: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.neutral500 },
  macroValue: { fontFamily: font.body, fontSize: 16, color: color.text, marginTop: 6, marginBottom: 8 },
  macroGoal: { fontSize: 11, color: color.neutral500 },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  actionCard: { flex: 1 },
  actionTitle: { fontFamily: font.body, fontSize: 14.5, color: color.text, marginTop: 8 },
  actionSub: { fontFamily: font.body, fontSize: 11.5, color: color.neutral400, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 20 },
  sectionTitle: { fontFamily: font.body, fontSize: 15, color: color.text },
  link: { fontFamily: font.body, fontSize: 12.5, color: color.accent300 },
  mealList: { marginTop: 10, gap: 8 },
  mealHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mealHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mealName: { fontFamily: font.body, fontSize: 13.5, color: color.text },
  mealKcal: { fontFamily: font.body, fontSize: 12.5, color: color.neutral400 },
  mealItemRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 8 },
  mealItemName: { fontFamily: font.body, fontSize: 12, color: color.neutral400, flexShrink: 1 },
  mealItemKcal: { fontFamily: font.body, fontSize: 12, color: color.neutral400 },
  statsCard: { flexDirection: 'row', gap: 14, marginTop: 20, padding: 14 },
  statCell: { flex: 1 },
  statDivider: { width: 1, backgroundColor: color.neutral800 },
  statLabel: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.neutral500 },
  statValue: { fontFamily: font.body, fontSize: 19, color: color.text, marginTop: 5 },
});
