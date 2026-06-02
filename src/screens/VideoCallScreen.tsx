import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Users, PhoneCall } from 'lucide-react-native';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraVideoCall } from '../hooks/useAgoraVideoCall';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'VideoCall')!;

const VideoCallScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    remoteUid,
    isMuted,
    isVideoEnabled,
    speakerOn,
    joinCall,
    leaveCall,
    toggleMute,
    toggleVideo,
    switchCamera,
    toggleSpeaker,
  } = useAgoraVideoCall();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      {isJoined ? (
        <>
          <View style={styles.videoContainer}>
            {remoteUid ? (
              <RtcSurfaceView
                style={StyleSheet.absoluteFill}
                canvas={{ uid: remoteUid }}
                zOrderMediaOverlay={false}
              />
            ) : (
              <View style={styles.placeholder}>
                <Users size={60} color={theme.textSecondary} />
                <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>
                  Waiting for peer in {channelName}…
                </Text>
              </View>
            )}
            <View style={styles.localVideo}>
              <RtcSurfaceView
                style={StyleSheet.absoluteFill}
                canvas={{ sourceType: VideoSourceType.VideoSourceCamera }}
              />
            </View>
          </View>
          <CallControls
            isMuted={isMuted}
            isVideoEnabled={isVideoEnabled}
            speakerOn={speakerOn}
            onToggleMute={toggleMute}
            onToggleVideo={toggleVideo}
            onSwitchCamera={switchCamera}
            onToggleSpeaker={toggleSpeaker}
            onEnd={leaveCall}
          />
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.preJoin}>
          <DemoBanner
            channel={channelName}
            sdkFeature={meta.sdkFeature}
            testHint={meta.testHint}
          />
          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <View style={[styles.iconContainer, { backgroundColor: Colors.highlight }]}>
              <PhoneCall size={36} color={Colors.primary} />
            </View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              1:1 Video Call
            </Text>
            <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>
              Communication channel — join on two devices with the same channel name.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.primary }]}
            onPress={async () => {
              if (await ensureFeaturePermissions('videoCall')) {
                await joinCall();
              }
            }}
          >
            <Phone size={24} color={Colors.white} />
            <Text style={styles.buttonText}>Join channel</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  preJoin: { paddingTop: 8, paddingBottom: 24 },
  videoContainer: { flex: 1, position: 'relative' },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceVariant,
    margin: 16,
    borderRadius: 16,
  },
  placeholderText: { marginTop: 20, fontSize: 16, textAlign: 'center', paddingHorizontal: 20 },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 110,
    height: 150,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  card: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 22, fontWeight: '700' },
  cardDescription: { fontSize: 15, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 14,
    gap: 10,
  },
  buttonText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
});
