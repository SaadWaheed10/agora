import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Settings,
  User,
  Bell,
  Shield,
  HelpCircle,
  Info,
} from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

const SettingsScreen = () => {
  // Force dark mode for consistent theming
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  const settingsItems = [
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your account settings',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Control your privacy settings',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
    },
    { icon: Info, title: 'About', description: 'App version and information' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Settings
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Configure your Agora experience
        </Text>
      </View>

      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.settingItem, { backgroundColor: themeColors.surface }]}
        >
          <View style={styles.settingIconContainer}>
            <item.icon size={24} color={Colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text
              style={[styles.settingTitle, { color: themeColors.textPrimary }]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.settingDescription,
                { color: themeColors.textSecondary },
              ]}
            >
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: Colors.primary }]}
        >
          <Settings size={24} color={Colors.white} />
          <Text style={styles.controlButtonText}>Advanced Settings</Text>
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  controlsContainer: {
    marginTop: 20,
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
});

export default SettingsScreen;
