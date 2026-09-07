import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { PhosphorIcon } from '../components/PhosphorIcon';
import { ScreenHeader } from '../components/ScreenHeader';
import { RECIPES } from '../data/recipes';
import { useApp } from '../state/AppContext';
import { color, elevation, font, radius } from '../theme';

export function RecipesScreen() {
  const navigation = useNavigation<any>();
  const { meal, addRecipeEntry } = useApp();
  const [openIndex, setOpenIndex] = useState(-1);

  const onAdd = (r: (typeof RECIPES)[number]) => {
    addRecipeEntry(r);
    setOpenIndex(-1);
    navigation.navigate('Tabs', { screen: 'Dashboard' });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <ScreenHeader title="Rezepte" onBack={() => navigation.goBack()} />
      </View>
      <FlatList
        data={RECIPES}
        keyExtractor={(r) => r.name}
        contentContainerStyle={styles.list}
        renderItem={({ item: r, index: i }) => {
          const open = openIndex === i;
          return (
            <View style={styles.card}>
              <Pressable style={styles.rowBtn} onPress={() => setOpenIndex(open ? -1 : i)}>
                <LinearGradient
                  colors={[color.accent800, color.neutral900]}
                  start={{ x: 0.15, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={styles.icon}
                >
                  <PhosphorIcon name={r.icon} size={20} color={color.accent300} />
                </LinearGradient>
                <View style={styles.info}>
                  <Text style={styles.name}>{r.name}</Text>
                  <Text style={styles.meta}>
                    {r.kcal} kcal · {r.protein} g Protein · {r.time}
                  </Text>
                </View>
                <PhosphorIcon name={open ? 'caretUp' : 'caretDown'} size={16} color={color.neutral600} />
              </Pressable>
              {open && (
                <View style={styles.detail}>
                  <View style={styles.divider} />
                  {r.ingredients.map((ing) => (
                    <View key={ing.name} style={styles.ingRow}>
                      <Text style={styles.ingName}>{ing.name}</Text>
                      <Text style={styles.ingAmount}>{ing.amount}</Text>
                    </View>
                  ))}
                  <Button variant="primary" block onPress={() => onAdd(r)} style={styles.addBtn}>
                    {`Als ${meal} loggen`}
                  </Button>
                </View>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  header: { padding: 16, paddingBottom: 0 },
  list: { padding: 18, paddingTop: 14, gap: 10 },
  card: { backgroundColor: color.surface, borderRadius: radius.lg, overflow: 'hidden', ...elevation.sm },
  rowBtn: { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 14 },
  icon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontFamily: font.body, fontSize: 14.5, color: color.text },
  meta: { fontFamily: font.body, fontSize: 11.5, color: color.neutral500, marginTop: 3 },
  detail: { paddingHorizontal: 14, paddingBottom: 14 },
  divider: { height: 1, backgroundColor: color.neutral800, marginBottom: 12 },
  ingRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  ingName: { fontFamily: font.body, fontSize: 12.5, color: color.neutral400 },
  ingAmount: { fontFamily: font.body, fontSize: 12.5, color: color.neutral400 },
  addBtn: { marginTop: 12 },
});
