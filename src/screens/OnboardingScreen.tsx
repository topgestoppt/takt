import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Button } from '../components/Button';
import { PhosphorIcon, type IconName } from '../components/PhosphorIcon';
import { color, font } from '../theme';

const STEP_TITLES = ['Was ist dein Ziel?', 'Wie oft trainierst du?', 'Alles bereit.'];
const STEP_BODIES = [
  'TAKT rechnet Kalorien und Training zusammen. Sag uns, worauf du hinarbeitest.',
  'Daraus ergibt sich dein Grundbudget — und wie viel du an Trainingstagen dazubekommst.',
  'Du kannst alles später im Profil ändern.',
];

const GOALS: { name: string; hint: string; icon: IconName }[] = [
  { name: 'Abnehmen', hint: 'Defizit, Muskeln halten', icon: 'trendDown' },
  { name: 'Muskeln aufbauen', hint: 'Leichter Überschuss', icon: 'trendUp' },
  { name: 'Gewicht halten', hint: 'Leistung im Fokus', icon: 'equals' },
];

export function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('Abnehmen');
  const [days, setDays] = useState(4);

  const isGoal = step === 0;
  const isDays = step === 1;
  const isDone = step === 2;

  const next = () => {
    if (step === 2) {
      navigation.navigate('Tabs', { screen: 'Dashboard' });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.dot, { backgroundColor: i <= step ? color.accent : color.neutral900 }]} />
        ))}
      </View>

      <Text style={styles.kicker}>Schritt {step + 1} von 3</Text>
      <Text style={styles.stepTitle}>{STEP_TITLES[step]}</Text>
      <Text style={styles.stepBody}>{STEP_BODIES[step]}</Text>

      {isGoal && (
        <View style={styles.goalList}>
          {GOALS.map((g) => {
            const active = goal === g.name;
            return (
              <Pressable
                key={g.name}
                onPress={() => setGoal(g.name)}
                style={[
                  styles.goalRow,
                  { backgroundColor: active ? color.accent900 : 'transparent', borderColor: active ? color.accent700 : color.neutral800 },
                ]}
              >
                <PhosphorIcon name={g.icon} size={20} color={active ? color.accent : color.neutral500} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.goalName}>{g.name}</Text>
                  <Text style={styles.goalHint}>{g.hint}</Text>
                </View>
                {active && <PhosphorIcon name="checkCircle" weight="fill" size={18} color={color.accent} />}
              </Pressable>
            );
          })}
        </View>
      )}

      {isDays && (
        <View style={styles.daysBlock}>
          <View style={styles.daysHeader}>
            <Text style={styles.daysLabel}>Trainingstage pro Woche</Text>
            <Text style={styles.daysValue}>{days}</Text>
          </View>
          <Slider
            minimumValue={1}
            maximumValue={7}
            step={1}
            value={days}
            onValueChange={setDays}
            minimumTrackTintColor={color.accent}
            maximumTrackTintColor={color.neutral800}
            thumbTintColor={color.accent}
            style={styles.slider}
          />
          <View style={styles.sliderEnds}>
            <Text style={styles.sliderEndLabel}>1</Text>
            <Text style={styles.sliderEndLabel}>7</Text>
          </View>
          <View style={styles.bonusInfo}>
            <View style={styles.bonusHeader}>
              <PhosphorIcon name="lightning" weight="fill" size={15} color={color.accent} />
              <Text style={styles.bonusTitle}>Trainingsbonus</Text>
            </View>
            <Text style={styles.bonusBody}>
              An Trainingstagen hebt TAKT dein Kalorienbudget automatisch um den verbrauchten Anteil an — du isst
              mehr, wenn du mehr leistest.
            </Text>
          </View>
        </View>
      )}

      {isDone && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryKicker}>Dein Tagesbudget</Text>
          <Text style={styles.summaryValue}>
            2.140<Text style={styles.summaryUnit}> kcal</Text>
          </Text>
          <View style={styles.summaryDivider} />
          <SummaryRow label="Protein" value="165 g" />
          <SummaryRow label="Kohlenhydrate" value="210 g" />
          <SummaryRow label="Fett" value="68 g" />
          <SummaryRow label="Trainingsbonus" value="+320 kcal" accent />
        </View>
      )}

      <View style={{ flex: 1 }} />
      <View style={styles.actions}>
        {step > 0 && (
          <Button variant="ghost" onPress={() => setStep(step - 1)}>
            Zurück
          </Button>
        )}
        <Button variant="primary" style={{ flex: 1 }} onPress={next}>
          {step === 2 ? 'Los geht’s' : 'Weiter'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValueSmall, accent && { color: color.accent300 }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg, padding: 22, paddingTop: 20, paddingBottom: 22 },
  dotsRow: { flexDirection: 'row', gap: 6 },
  dot: { flex: 1, height: 3, borderRadius: 2 },
  kicker: { fontFamily: font.body, fontSize: 11.5, letterSpacing: 2, textTransform: 'uppercase', color: color.neutral500, marginTop: 26 },
  stepTitle: { fontFamily: font.heading, fontSize: 27, color: color.text, marginTop: 8, lineHeight: 33 },
  stepBody: { fontFamily: font.body, fontSize: 13.5, color: color.neutral400, marginTop: 10, lineHeight: 20 },
  goalList: { gap: 9, marginTop: 24 },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 12, padding: 14 },
  goalName: { fontFamily: font.body, fontSize: 14.5, color: color.text },
  goalHint: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500, marginTop: 2 },
  daysBlock: { marginTop: 26 },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  daysLabel: { fontFamily: font.body, fontSize: 13, color: color.neutral400 },
  daysValue: { fontFamily: font.body, fontSize: 26, color: color.accent300 },
  slider: { width: '100%', marginTop: 14, height: 40 },
  sliderEnds: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -6 },
  sliderEndLabel: { fontFamily: font.body, fontSize: 11, color: color.neutral600 },
  bonusInfo: { marginTop: 22, padding: 14, borderRadius: 12, backgroundColor: color.accent900, borderWidth: 1, borderColor: color.accent800 },
  bonusHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bonusTitle: { fontFamily: font.body, fontSize: 12.5, color: color.accent300 },
  bonusBody: { fontFamily: font.body, fontSize: 12.5, color: color.neutral300, marginTop: 8, lineHeight: 18 },
  summaryCard: { marginTop: 26, padding: 18, borderRadius: 14, backgroundColor: color.surface, borderWidth: 1, borderColor: color.neutral800 },
  summaryKicker: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.neutral500 },
  summaryValue: { fontFamily: font.heading, fontSize: 34, color: color.text, marginTop: 6 },
  summaryUnit: { fontFamily: font.body, fontSize: 15, color: color.neutral500 },
  summaryDivider: { height: 1, backgroundColor: color.neutral800, marginVertical: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  summaryLabel: { fontFamily: font.body, fontSize: 13, color: color.neutral400 },
  summaryValueSmall: { fontFamily: font.body, fontSize: 13, color: color.text },
  actions: { flexDirection: 'row', gap: 10, paddingTop: 20 },
});
