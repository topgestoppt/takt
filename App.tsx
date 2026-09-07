import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppProvider, useApp } from './src/state/AppContext';
import { Toast } from './src/components/Toast';
import { color } from './src/theme';

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: color.bg,
    card: color.bg,
    text: color.text,
    border: color.neutral800,
    primary: color.accent,
  },
};

function ToastHost() {
  const { toast } = useApp();
  if (!toast) return null;
  return <Toast message={toast} />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaProvider>
        <AppProvider>
          <View style={styles.fill}>
            <NavigationContainer theme={navTheme}>
              <RootNavigator />
            </NavigationContainer>
            <ToastHost />
          </View>
          <StatusBar style="light" />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: color.bg },
});
