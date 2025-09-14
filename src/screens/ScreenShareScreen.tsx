import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Monitor, Settings } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

const ScreenShareScreen = () => {
  // Force dark mode for consistent theming
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Screen Share
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Share your screen with others
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.iconContainer}>
          <Monitor size={32} color={Colors.primary} />
        </View>
        <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
          Start Screen Share
        </Text>
        <Text
          style={[styles.cardDescription, { color: themeColors.textSecondary }]}
        >
          Share your entire screen or specific applications
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: Colors.primary }]}
        >
          <Monitor size={24} color={Colors.white} />
          <Text style={styles.controlButtonText}>Start Screen Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.controlButtonWithBorder,
            {
              backgroundColor: themeColors.surface,
              borderColor: Colors.primary,
            },
          ]}
        >
          <Settings size={24} color={Colors.primary} />
          <Text style={[styles.controlButtonText, { color: Colors.primary }]}>
            Share Settings
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  controlsContainer: {
    marginTop: 20,
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  controlButtonWithBorder: {
    borderWidth: 1,
  },
});

export default ScreenShareScreen;
