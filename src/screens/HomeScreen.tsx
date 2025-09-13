import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Home } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = getThemeColors(isDarkMode);

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Home size={48} color={Colors.primary} />
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>
        Home
      </Text>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
        Welcome to your home screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
