import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, PhoneOff, Mic, MicOff, Users } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';
import { useAgoraAudioCall } from '../hooks/useAgoraAudioCall';
import { ensureFeaturePermissions } from '../hooks/usePermission';

const AudioCallScreen = () => {
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);
  const [channelName] = useState('audio-call-room-123');

  const { isJoined, remoteUid, isMuted, joinCall, leaveCall, toggleMute } =
    useAgoraAudioCall(channelName);

  const handleJoin = async () => {
    if (await ensureFeaturePermissions('audioCall')) {
      await joinCall();
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>
            Audio Call
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            {isJoined
              ? remoteUid
                ? `Connected with user ${remoteUid}`
                : 'Waiting for someone to join...'
              : 'High-quality audio calling'}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
          <View style={styles.iconContainer}>
            <Phone size={32} color={Colors.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
            {isJoined ? 'Call in progress' : 'Start Audio Call'}
          </Text>
          <Text
            style={[styles.cardDescription, { color: themeColors.textSecondary }]}
          >
            {isJoined
              ? `Room: ${channelName}`
              : 'Create a new audio-only call room'}
          </Text>
        </View>

        {isJoined && (
          <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <View style={styles.iconContainer}>
              <Users size={32} color={Colors.secondary} />
            </View>
            <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
              Participants
            </Text>
            <Text
              style={[
                styles.cardDescription,
                { color: themeColors.textSecondary },
              ]}
            >
              {remoteUid ? `Remote user: ${remoteUid}` : 'You are the only one here'}
            </Text>
          </View>
        )}

        <View style={styles.controlsContainer}>
          {!isJoined ? (
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: Colors.primary }]}
              onPress={handleJoin}
            >
              <Phone size={24} color={Colors.white} />
              <Text style={styles.controlButtonText}>Start Audio Call</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.controlButton, isMuted && styles.mutedButton]}
                onPress={toggleMute}
              >
                {isMuted ? (
                  <MicOff size={24} color={Colors.white} />
                ) : (
                  <Mic size={24} color={Colors.white} />
                )}
                <Text style={styles.controlButtonText}>
                  {isMuted ? 'Unmute' : 'Mute'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.endButton]}
                onPress={leaveCall}
              >
                <PhoneOff size={24} color={Colors.white} />
                <Text style={styles.controlButtonText}>End Call</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 8 },
  header: { marginBottom: 30, alignItems: 'center', paddingTop: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: 'center' },
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
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  cardDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  controlsContainer: { marginTop: 20, gap: 12 },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  controlButtonText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  mutedButton: { backgroundColor: Colors.error },
  endButton: { backgroundColor: Colors.error },
});

export default AudioCallScreen;
