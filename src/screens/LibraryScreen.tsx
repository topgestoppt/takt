import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Chip } from '../components/Chip';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { ScreenHeader } from '../components/ScreenHeader';
import { EXERCISE_LIBRARY, MUSCLE_GROUPS } from '../data/exercises';
import { useApp } from '../state/AppContext';
import { color, elevation, font, radius } from '../theme';

export function LibraryScreen() {
  const navigation = useNavigation<any>();
  const { flash } = useApp();
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('Alle');

  const results = EXERCISE_LIBRARY.filter(
    (e) => (group === 'Alle' || e.group === group) && e.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <ScreenHeader title="Übungen" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchRow}>
          <PhosphorIcon name="magnifyingGlass" size={16} color={color.neutral500} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Übung suchen"
            placeholderTextColor={color.neutral500}
            style={styles.input}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupsRow}>
        {MUSCLE_GROUPS.map((g) => (
          <Chip key={g} label={g} active={group === g} onPress={() => setGroup(g)} pill style={styles.groupChip} />
        ))}
      </ScrollView>

      <FlatList
        data={results}
        keyExtractor={(e) => e.name}
        contentContainerStyle={styles.list}
        renderItem={({ item: e }) => (
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => flash(`${e.name} zu Push A hinzugefügt`)}
          >
            <View style={styles.iconWrap}>
              <PhosphorIcon name={e.icon} size={17} color={color.neutral400} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{e.name}</Text>
              <Text style={styles.meta}>
                {e.group} · {e.kind}
              </Text>
            </View>
            <PhosphorIcon name="plus" size={15} color={color.neutral600} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  header: { padding: 16, paddingBottom: 0 },
  searchWrap: { paddingHorizontal: 18, paddingTop: 14 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 9,
    backgroundColor: color.surface, borderRadius: 10, borderWidth: 1, borderColor: color.neutral800, paddingHorizontal: 12,
  },
  input: { flex: 1, fontFamily: font.body, fontSize: 14, color: color.text, paddingVertical: 12 },
  groupsRow: { paddingHorizontal: 18, paddingTop: 12, gap: 7 },
  groupChip: {},
  list: { padding: 18, paddingTop: 14, gap: 8 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 14,
    backgroundColor: color.surface, borderRadius: radius.md, ...elevation.sm,
  },
  rowPressed: { backgroundColor: color.neutral900 },
  iconWrap: {
    width: 38, height: 38, borderRadius: 9, backgroundColor: color.neutral900,
    alignItems: 'center', justifyContent: 'center',
  },
  info: { flex: 1 },
  name: { fontFamily: font.body, fontSize: 14, color: color.text },
  meta: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500, marginTop: 2 },
});
