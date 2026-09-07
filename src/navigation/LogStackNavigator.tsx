import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogScreen } from '../screens/LogScreen';
import { RecipesScreen } from '../screens/RecipesScreen';
import type { LogStackParamList } from './types';

const Stack = createNativeStackNavigator<LogStackParamList>();

export function LogStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Log" component={LogScreen} />
      <Stack.Screen name="Recipes" component={RecipesScreen} />
    </Stack.Navigator>
  );
}
