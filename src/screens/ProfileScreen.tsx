import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Toggle } from '../components/Toggle';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { PressableCard } from '../components/PressableCard';
import { useApp } from '../state/AppContext';
import { color, font } from '../theme';

const UNIT_OPTIONS = ['kg / cm', 'lb / in'];

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { units, setUnits, bonusEnabled, setBonusEnabled, notify, setNotify, flash } = useApp();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profil</Text>

      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JB</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Jonas Brandt</Text>
          <Text style={styles.meta}>32 J. · 181 cm · 80,6 kg</Text>
        </View>
        <PhosphorIcon name="pencilSimple" size={17} color={color.neutral600} />
      </Card>

      <Card>
        <Text style={styles.kicker}>Ziel</Text>
        <Text style={styles.goalTitle}>Abnehmen, 0,4 kg pro Woche</Text>
        <Text style={styles.goalSub}>Grundbudget 2.140 kcal · 4 Trainingstage</Text>
        <Button
          variant="secondary"
          style={styles.recalcBtn}
          onPress={() => navigation.navigate('Onboarding')}
        >
          Ziel neu berechnen
        </Button>
      </Card>

      <Card>
        <Text style={styles.unitsLabel}>Einheiten</Text>
        <View style={styles.unitsRow}>
          {UNIT_OPTIONS.map((u) => (
            <Chip key={u} label={u} active={units === u} onPress={() => setUnits(u)} style={{ flex: 1 }} />
          ))}
        </View>
      </Card>

      <ToggleRow
        name="Trainingsbonus"
        hint="Budget an Trainingstagen anheben"
        on={bonusEnabled}
        onPress={() => setBonusEnabled(!bonusEnabled)}
      />
      <ToggleRow name="Erinnerungen" hint="Mahlzeiten und Trainingstage" on={notify} onPress={() => setNotify(!notify)} />
      <ToggleRow
        name="Gesundheitsdaten"
        hint="Schritte von Health Connect"
        on={true}
        onPress={() => flash('Health Connect ist verbunden')}
      />

      <PressableCard onPress={() => navigation.navigate('Training', { screen: 'Library' })}>
        <View style={styles.linkRow}>
          <Text style={styles.linkText}>Übungs-Bibliothek</Text>
          <PhosphorIcon name="caretRight" size={15} color={color.neutral600} />
        </View>
      </PressableCard>
      <PressableCard onPress={() => navigation.navigate('Essen', { screen: 'Recipes' })}>
        <View style={styles.linkRow}>
          <Text style={styles.linkText}>Rezepte</Text>
          <PhosphorIcon name="caretRight" size={15} color={color.neutral600} />
        </View>
      </PressableCard>
    </ScrollView>
    </SafeAreaView>
  );
}

function ToggleRow({ name, hint, on, onPress }: { name: string; hint: string; on: boolean; onPress: () => void }) {
  return (
    <Card padding={13} style={styles.toggleCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.toggleName}>{name}</Text>
        <Text style={styles.toggleHint}>{hint}</Text>
      </View>
      <Toggle on={on} onPress={onPress} />
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  content: { padding: 18, paddingTop: 16, paddingBottom: 40, gap: 12 },
  title: { fontFamily: font.heading, fontSize: 22, color: color.text },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: color.accent900,
    borderWidth: 1, borderColor: color.accent700, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: font.body, fontSize: 16, color: color.accent300 },
  name: { fontFamily: font.body, fontSize: 16, color: color.text },
  meta: { fontFamily: font.body, fontSize: 12, color: color.neutral500, marginTop: 3 },
  kicker: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.neutral500 },
  goalTitle: { fontFamily: font.body, fontSize: 16, color: color.text, marginTop: 6 },
  goalSub: { fontFamily: font.body, fontSize: 12.5, color: color.neutral400, marginTop: 4 },
  recalcBtn: { marginTop: 12 },
  unitsLabel: { fontFamily: font.body, fontSize: 13, color: color.neutral400 },
  unitsRow: { flexDirection: 'row', gap: 7, marginTop: 10 },
  toggleCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleName: { fontFamily: font.body, fontSize: 14, color: color.text },
  toggleHint: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500, marginTop: 2 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  linkText: { flex: 1, fontFamily: font.body, fontSize: 14, color: color.text },
});
