import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Polyline } from 'react-native-svg';
import { Card } from '../components/Card';
import { PERSONAL_RECORDS, VOLUME_PER_WEEK, VOLUME_START_WEEK, WEIGHT_HISTORY } from '../data/progress';
import { color, font } from '../theme';

const wy = (w: number) => 100 - ((w - 80) / 4.5) * 90;

export function ProgressScreen() {
  const points = WEIGHT_HISTORY.map((w, i) => {
    const x = i * (320 / (WEIGHT_HISTORY.length - 1));
    return `${x.toFixed(1)},${wy(w).toFixed(1)}`;
  }).join(' ');
  const lastY = wy(WEIGHT_HISTORY[WEIGHT_HISTORY.length - 1]);
  const maxVolume = 30;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Fortschritt</Text>

      <View style={styles.statsRow}>
        <Card padding={13} style={{ flex: 1 }}>
          <Text style={styles.statLabel}>Gewicht</Text>
          <Text style={styles.statValue}>80,6 kg</Text>
          <Text style={styles.statSub}>−3,6 kg in 12 Wochen</Text>
        </Card>
        <Card padding={13} style={{ flex: 1 }}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>12 Tage</Text>
          <Text style={[styles.statSub, { color: color.neutral500 }]}>Bestwert: 21</Text>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Gewichtsverlauf</Text>
        <Svg viewBox="0 0 320 120" style={styles.svg}>
          <Line x1={0} y1={100} x2={320} y2={100} stroke={color.neutral800} strokeWidth={1} />
          <Line x1={0} y1={55} x2={320} y2={55} stroke={color.neutral800} strokeWidth={1} />
          <Line x1={0} y1={10} x2={320} y2={10} stroke={color.neutral800} strokeWidth={1} />
          <Polyline points={points} fill="none" stroke={color.accent} strokeWidth={2} strokeLinejoin="round" />
          <Circle cx={320} cy={lastY} r={4} fill={color.accent} />
        </Svg>
        <View style={styles.monthsRow}>
          {['Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
            <Text key={m} style={styles.monthLabel}>{m}</Text>
          ))}
        </View>
      </Card>

      <Card style={styles.chartCard}>
        <View style={styles.volumeHeader}>
          <Text style={styles.chartTitle}>Trainingsvolumen</Text>
          <Text style={styles.volumeSub}>Tonnen / Woche</Text>
        </View>
        <View style={styles.barsRow}>
          {VOLUME_PER_WEEK.map((v, i) => {
            const isLast = i === VOLUME_PER_WEEK.length - 1;
            return (
              <View key={i} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      { height: `${(v / maxVolume) * 100}%`, backgroundColor: isLast ? color.accent : color.neutral800 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{`W${VOLUME_START_WEEK + i}`}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Neue Bestleistungen</Text>
        {PERSONAL_RECORDS.map((p) => (
          <View key={p.name} style={styles.prRow}>
            <Text style={styles.prName}>{p.name}</Text>
            <Text style={styles.prValue}>{p.value}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  content: { padding: 18, paddingTop: 16, paddingBottom: 40, gap: 12 },
  title: { fontFamily: font.heading, fontSize: 22, color: color.text },
  statsRow: { flexDirection: 'row', gap: 10 },
  statLabel: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.neutral500 },
  statValue: { fontFamily: font.body, fontSize: 19, color: color.text, marginTop: 5 },
  statSub: { fontFamily: font.body, fontSize: 11.5, color: color.accent300, marginTop: 2 },
  chartCard: { padding: 14 },
  chartTitle: { fontFamily: font.body, fontSize: 13.5, color: color.text },
  svg: { width: '100%', height: 120, marginTop: 10 },
  monthsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  monthLabel: { fontFamily: font.body, fontSize: 10.5, color: color.neutral600 },
  volumeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  volumeSub: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 96, marginTop: 12 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 6 },
  barTrack: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  barLabel: { fontFamily: font.body, fontSize: 10, color: color.neutral600 },
  prRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  prName: { fontFamily: font.body, fontSize: 13, color: color.neutral300 },
  prValue: { fontFamily: font.body, fontSize: 13, color: color.accent300 },
});
