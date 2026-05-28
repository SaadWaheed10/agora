import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  Users,
  PhoneCall,
} from 'lucide-react-native';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraVideoCall } from '../hooks/useAgoraVideoCall';
import { ensureFeaturePermissions } from '../hooks/usePermission';

const VideoCallScreen = () => {
  const isDarkMode = true;
  const theme = getThemeColors(isDarkMode);

  const [channelName] = useState('video-call-room-123'); // Can be dynamic
  const {
    isJoined,
    remoteUid,
    isMuted,
    isVideoEnabled,
    joinCall,
    leaveCall,
    toggleMute,
    toggleVideo,
    switchCamera,
  } = useAgoraVideoCall(channelName);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Video Area */}
      <View style={styles.videoContainer}>
        {/* Remote Video (Full Screen) */}
        {isJoined && remoteUid ? (
          <RtcSurfaceView
            style={StyleSheet.absoluteFill}
            canvas={{ uid: remoteUid }}
            zOrderMediaOverlay={false}
          />
        ) : (
          <View style={styles.placeholder}>
            <Users size={60} color={theme.textSecondary} />
            <Text
              style={[styles.placeholderText, { color: theme.textSecondary }]}
            >
              {isJoined
                ? 'Waiting for someone to join...'
                : 'Start a video call'}
            </Text>
          </View>
        )}

        {/* Local Video (Small PiP) */}
        {isJoined && (
          <View style={styles.localVideo}>
            <RtcSurfaceView
              style={StyleSheet.absoluteFill}
              canvas={{ sourceType: VideoSourceType.VideoSourceCamera }}
            />
          </View>
        )}
      </View>

      {/* Call Controls */}
      {isJoined ? (
        <View style={styles.callControls}>
          <TouchableOpacity
            style={[styles.fab, isMuted && styles.muted]}
            onPress={toggleMute}
          >
            {isMuted ? (
              <MicOff size={28} color={Colors.white} />
            ) : (
              <Mic size={28} color={Colors.white} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fab, !isVideoEnabled && styles.muted]}
            onPress={toggleVideo}
          >
            {isVideoEnabled ? (
              <Video size={28} color={Colors.white} />
            ) : (
              <VideoOff size={28} color={Colors.white} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fab, styles.endCall]}
            onPress={leaveCall}
          >
            <PhoneOff size={32} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fab} onPress={switchCamera}>
            <Camera size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Start/Join Section */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Video Call
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              High-quality 1-on-1 or group calls
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: Colors.highlight },
              ]}
            >
              <PhoneCall size={36} color={Colors.primary} />
            </View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Ready to Connect
            </Text>
            <Text
              style={[styles.cardDescription, { color: theme.textSecondary }]}
            >
              Join or create a call instantly
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: Colors.primary }]}
              onPress={async () => {
                if (await ensureFeaturePermissions('videoCall')) {
                  await joinCall();
                }
              }}
            >
              <Phone size={24} color={Colors.white} />
              <Text style={styles.buttonText}>Start Call</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceVariant,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  placeholderText: { marginTop: 20, fontSize: 18 },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 120,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary,
    elevation: 10,
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(13,17,23,0.9)',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  muted: { backgroundColor: Colors.error },
  endCall: { backgroundColor: Colors.error },
  header: { alignItems: 'center', padding: 30 },
  title: { fontSize: 34, fontWeight: '800' },
  subtitle: { fontSize: 16, marginTop: 8 },
  card: {
    marginHorizontal: 20,
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: { fontSize: 22, fontWeight: '700' },
  cardDescription: { fontSize: 15, textAlign: 'center', marginTop: 8 },
  buttonContainer: { paddingHorizontal: 20, marginTop: 30, gap: 16 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 12,
    elevation: 8,
  },
  buttonText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
});
