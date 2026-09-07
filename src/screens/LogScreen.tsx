import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { fmt, MEAL_NAMES, useApp } from '../state/AppContext';
import { FOODS } from '../data/foods';
import { color, font } from '../theme';

export function LogScreen() {
  const navigation = useNavigation<any>();
  const { meal, setMeal, addFoodEntry, remaining } = useApp();
  const [q, setQ] = useState('');

  const results = FOODS.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Essen loggen</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{fmt(remaining)} kcal übrig</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <PhosphorIcon name="magnifyingGlass" size={16} color={color.neutral500} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Lebensmittel suchen"
            placeholderTextColor={color.neutral500}
            style={styles.input}
          />
          <Pressable onPress={() => navigation.navigate('Scan')}>
            <PhosphorIcon name="barcode" size={18} color={color.accent} />
          </Pressable>
        </View>

        <View style={styles.tabsRow}>
          {MEAL_NAMES.map((m) => (
            <Chip key={m.name} label={m.name} active={meal === m.name} onPress={() => setMeal(m.name)} style={styles.tab} />
          ))}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(f) => f.name}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nichts gefunden. Scanne den Barcode oder leg das Lebensmittel selbst an.</Text>
        }
        renderItem={({ item: f }) => (
          <Card padding={12} style={styles.foodRow}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{f.name}</Text>
              <Text style={styles.foodMeta}>
                {f.portion} · {f.kcal} kcal · {f.protein} P / {f.carbs} KH / {f.fat} F
              </Text>
            </View>
            <Pressable style={styles.addBtn} onPress={() => addFoodEntry(f)}>
              <PhosphorIcon name="plus" size={18} color={color.accent300} />
            </Pressable>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  header: { padding: 18, paddingBottom: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { flex: 1, fontFamily: font.heading, fontSize: 22, color: color.text },
  tag: { borderWidth: 1, borderColor: color.accent, borderRadius: 6, paddingVertical: 3, paddingHorizontal: 10 },
  tagText: { fontFamily: font.body, fontSize: 11, color: color.accent },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 14,
    backgroundColor: color.surface, borderRadius: 10, borderWidth: 1, borderColor: color.neutral800, paddingHorizontal: 12,
  },
  input: { flex: 1, fontFamily: font.body, fontSize: 14, color: color.text, paddingVertical: 12 },
  tabsRow: { flexDirection: 'row', gap: 7, marginTop: 12 },
  tab: { flex: 1 },
  list: { padding: 18, paddingTop: 14, gap: 8 },
  empty: { textAlign: 'center', padding: 40, color: color.neutral500, fontFamily: font.body, fontSize: 13 },
  foodRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  foodInfo: { flex: 1 },
  foodName: { fontFamily: font.body, fontSize: 14, color: color.text },
  foodMeta: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500, marginTop: 3 },
  addBtn: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: color.accent700, backgroundColor: color.accent900,
  },
});
