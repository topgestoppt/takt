import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { SessionScreen } from '../screens/SessionScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Session" component={SessionScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Scan" component={ScanScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}
