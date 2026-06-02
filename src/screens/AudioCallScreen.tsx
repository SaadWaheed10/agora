import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Users } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';
import { useAgoraAudioCall } from '../hooks/useAgoraAudioCall';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'AudioCall')!;

const AudioCallScreen = () => {
  const themeColors = getThemeColors(true);
  const {
    channelName,
    isJoined,
    remoteUid,
    isMuted,
    speakerOn,
    joinCall,
    leaveCall,
    toggleMute,
    toggleSpeaker,
  } = useAgoraAudioCall();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DemoBanner
          channel={channelName}
          sdkFeature={meta.sdkFeature}
          testHint={meta.testHint}
        />

        <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
          <View style={styles.iconContainer}>
            <Phone size={32} color={Colors.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
            {isJoined ? 'Voice call active' : 'Voice call'}
          </Text>
          <Text
            style={[styles.cardDescription, { color: themeColors.textSecondary }]}
          >
            {isJoined
              ? remoteUid
                ? `Connected with UID ${remoteUid}`
                : 'Waiting for another user…'
              : 'Audio-only — publishCameraTrack is false'}
          </Text>
        </View>

        {isJoined && remoteUid != null && (
          <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <Users size={28} color={Colors.secondary} />
            <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
              Remote UID: {remoteUid}
            </Text>
          </View>
        )}

        <View style={styles.controlsContainer}>
          {!isJoined ? (
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: Colors.primary }]}
              onPress={async () => {
                if (await ensureFeaturePermissions('audioCall')) {
                  await joinCall();
                }
              }}
            >
              <Phone size={24} color={Colors.white} />
              <Text style={styles.controlButtonText}>Join voice channel</Text>
            </TouchableOpacity>
          ) : (
            <CallControls
              isMuted={isMuted}
              speakerOn={speakerOn}
              onToggleMute={toggleMute}
              onToggleSpeaker={toggleSpeaker}
              onEnd={leaveCall}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 8, paddingBottom: 24 },
  card: {
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  cardDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  controlsContainer: { marginTop: 8 },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginHorizontal: 4,
  },
  controlButtonText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});

export default AudioCallScreen;
