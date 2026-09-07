import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LogStackNavigator } from './LogStackNavigator';
import { PlanStackNavigator } from './PlanStackNavigator';
import { PhosphorIcon, type IconName } from '../components/PhosphorIcon';
import { color } from '../theme';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<keyof TabParamList, IconName> = {
  Dashboard: 'house',
  Essen: 'forkKnife',
  Training: 'barbell',
  Progress: 'chartLineUp',
  Profile: 'user',
};

const TAB_LABELS: Record<keyof TabParamList, string> = {
  Dashboard: 'Heute',
  Essen: 'Essen',
  Training: 'Training',
  Progress: 'Fortschritt',
  Profile: 'Profil',
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: color.accent300,
        tabBarInactiveTintColor: '#75798c',
        tabBarLabelStyle: styles.tabLabel,
        tabBarLabel: TAB_LABELS[route.name as keyof TabParamList],
        tabBarIcon: ({ focused, color: tint }) => (
          <PhosphorIcon
            name={TAB_ICONS[route.name as keyof TabParamList]}
            weight={focused ? 'fill' : 'regular'}
            size={21}
            color={tint}
          />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Essen" component={LogStackNavigator} />
      <Tab.Screen name="Training" component={PlanStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: color.bg,
    borderTopWidth: 1,
    borderTopColor: color.neutral800,
    paddingTop: 6,
    height: 62,
  },
  tabLabel: {
    fontSize: 10.5,
  },
});
