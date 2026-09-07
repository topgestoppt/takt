import type { NavigatorScreenParams } from '@react-navigation/native';

export type LogStackParamList = {
  Log: undefined;
  Recipes: undefined;
};

export type PlanStackParamList = {
  Plan: undefined;
  Library: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Essen: NavigatorScreenParams<LogStackParamList>;
  Training: NavigatorScreenParams<PlanStackParamList>;
  Progress: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Session: undefined;
  Scan: undefined;
  Onboarding: undefined;
};
