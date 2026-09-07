import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ScreenHeader } from '../components/ScreenHeader';
import { SCANNED_EAN, SCANNED_PRODUCT } from '../data/foods';
import { useApp } from '../state/AppContext';
import { color, font } from '../theme';

const BARS = [3, 6, 2, 8, 3, 4, 7, 2, 5, 3, 8, 2, 6, 4];

type ScanState = 'scanning' | 'found';

export function ScanScreen() {
  const navigation = useNavigation<any>();
  const { meal, addFoodEntry } = useApp();
  const [scan, setScan] = useState<ScanState>('scanning');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    startScan();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const startScan = () => {
    setScan('scanning');
    timer.current = setTimeout(() => setScan('found'), 1700);
  };

  const addScanned = () => {
    addFoodEntry(SCANNED_PRODUCT);
    navigation.navigate('Tabs', { screen: 'Essen', params: { screen: 'Log' } });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <ScreenHeader title="Barcode scannen" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.body}>
        <View style={styles.frame}>
          <View style={styles.innerFrame} />
          <View style={styles.barsRow}>
            {BARS.map((w, i) => (
              <View key={i} style={{ width: w, backgroundColor: color.neutral300, opacity: 0.5, alignSelf: 'stretch' }} />
            ))}
          </View>
          {scan === 'scanning' && <ScanLine />}
        </View>

        <Text style={styles.hint}>{scan === 'found' ? 'Produkt erkannt' : 'Halte den Barcode in den Rahmen'}</Text>

        {scan === 'found' && (
          <Card style={styles.resultCard}>
            <Text style={styles.resultKicker}>Gefunden</Text>
            <Text style={styles.resultTitle}>Skyr Vanille, 150 g</Text>
            <Text style={styles.resultMeta}>105 kcal · 15 g Protein · 9 g KH · 0 g Fett</Text>
            <Text style={styles.resultEan}>EAN {SCANNED_EAN}</Text>
            <View style={styles.resultActions}>
              <Button variant="primary" style={{ flex: 1 }} onPress={addScanned}>
                {`Zu ${meal} hinzufügen`}
              </Button>
              <Button variant="ghost" onPress={startScan}>
                Neu
              </Button>
            </View>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
}

function ScanLine() {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: 150, duration: 1100, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [y]);

  return (
    <View style={styles.scanLineWrap}>
      <Animated.View style={[styles.scanLine, { transform: [{ translateY: y }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  header: { padding: 14, paddingBottom: 0 },
  body: { padding: 18 },
  frame: {
    position: 'relative', aspectRatio: 1, borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#171826', borderWidth: 1, borderColor: color.neutral800,
    alignItems: 'center', justifyContent: 'center',
  },
  innerFrame: {
    position: 'absolute', left: 52, right: 52, top: 52, bottom: 52,
    borderRadius: 10, borderWidth: 1, borderColor: color.neutral800,
  },
  barsRow: { width: 120, height: 64, flexDirection: 'row', gap: 3 },
  scanLineWrap: { position: 'absolute', left: 52, right: 52, top: 100 },
  scanLine: { height: 2, backgroundColor: color.accent, borderRadius: 1 },
  hint: { textAlign: 'center', fontFamily: font.body, fontSize: 12.5, color: color.neutral500, marginTop: 14 },
  resultCard: { marginTop: 16 },
  resultKicker: { fontFamily: font.body, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase', color: color.accent300 },
  resultTitle: { fontFamily: font.heading, fontSize: 18, color: color.text, marginTop: 6 },
  resultMeta: { fontFamily: font.body, fontSize: 12.5, color: color.neutral400, marginTop: 4 },
  resultEan: { fontFamily: font.body, fontSize: 11, color: color.neutral600, marginTop: 8 },
  resultActions: { flexDirection: 'row', gap: 9, marginTop: 14 },
});
