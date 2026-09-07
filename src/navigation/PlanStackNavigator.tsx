import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlanScreen } from '../screens/PlanScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import type { PlanStackParamList } from './types';

const Stack = createNativeStackNavigator<PlanStackParamList>();

export function PlanStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="Library" component={LibraryScreen} />
    </Stack.Navigator>
  );
}
