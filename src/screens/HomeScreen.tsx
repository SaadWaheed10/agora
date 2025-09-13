import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Home } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

const HomeScreen = () => {
  // Force dark mode for consistent theming
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: themeColors.surface }]}
      >
        <Home size={48} color={Colors.primary} />
      </View>
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
