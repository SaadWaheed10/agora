/**
 * Agora React Native App
 *
 * @format
 */

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D1117"
        translucent={Platform.OS === 'android'}
      />
      <AppNavigator />
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
