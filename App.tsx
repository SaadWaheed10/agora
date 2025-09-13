/**
 * Agora React Native App
 * Bottom Tab Navigation with Home and Agora screens
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation';

function App() {
  // Force dark mode for the entire app
  const isDarkMode = true;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
