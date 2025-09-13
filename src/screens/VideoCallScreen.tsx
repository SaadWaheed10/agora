import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Phone,
  Users,
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneCall,
} from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

const VideoCallScreen = () => {
  // Force dark mode for consistent theming
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Video Call
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Start or join a video call
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.iconContainer}>
          <PhoneCall size={32} color={Colors.primary} />
        </View>
        <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
          Start Call
        </Text>
        <Text
          style={[styles.cardDescription, { color: themeColors.textSecondary }]}
        >
          Create a new video call room
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.iconContainer}>
          <Users size={32} color={Colors.secondary} />
        </View>
        <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
          Join Call
        </Text>
        <Text
          style={[styles.cardDescription, { color: themeColors.textSecondary }]}
        >
          Enter a room ID to join an existing call
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.iconContainer}>
          <Settings size={32} color={Colors.accent} />
        </View>
        <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
          Call Settings
        </Text>
        <Text
          style={[styles.cardDescription, { color: themeColors.textSecondary }]}
        >
          Configure video quality, audio settings, and more
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: Colors.primary }]}
        >
          <Phone size={24} color={Colors.white} />
          <Text style={styles.controlButtonText}>Start New Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: Colors.secondary }]}
        >
          <Users size={24} color={Colors.white} />
          <Text style={styles.controlButtonText}>Join Call</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default VideoCallScreen;
