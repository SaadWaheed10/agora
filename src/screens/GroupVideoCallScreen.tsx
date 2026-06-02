import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import { Users, Phone } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraGroupCall } from '../hooks/useAgoraGroupCall';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'GroupVideoCall')!;

const GroupVideoCallScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    remoteUsers,
    isMuted,
    isVideoEnabled,
    speakerOn,
    join,
    leave,
    toggleMute,
    toggleVideo,
    switchCamera,
    toggleSpeaker,
  } = useAgoraGroupCall();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      {!isJoined ? (
        <ScrollView contentContainerStyle={styles.preJoin}>
          <DemoBanner
            channel={channelName}
            sdkFeature={meta.sdkFeature}
            testHint={meta.testHint}
          />
          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: Colors.primary }]}
            onPress={async () => {
              if (await ensureFeaturePermissions('groupCall')) {
                await join();
              }
            }}
          >
            <Phone size={22} color={Colors.white} />
            <Text style={styles.startText}>Join group channel</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <View style={styles.videoArea}>
            {remoteUsers.length === 0 ? (
              <View style={styles.placeholder}>
                <Users size={48} color={theme.textSecondary} />
                <Text style={{ color: theme.textSecondary, marginTop: 12 }}>
                  Waiting for others in {channelName}…
                </Text>
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {remoteUsers.map(uid => (
                  <View key={uid} style={styles.remoteTile}>
                    <RtcSurfaceView
                      style={StyleSheet.absoluteFill}
                      canvas={{ uid }}
                    />
                    <Text style={styles.uidLabel}>UID {uid}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
            <View style={styles.localPip}>
              <RtcSurfaceView
                style={StyleSheet.absoluteFill}
                canvas={{ sourceType: VideoSourceType.VideoSourceCamera }}
              />
            </View>
          </View>
          <Text style={[styles.count, { color: theme.textSecondary }]}>
            {remoteUsers.length} remote participant(s)
          </Text>
          <CallControls
            isMuted={isMuted}
            isVideoEnabled={isVideoEnabled}
            speakerOn={speakerOn}
            onToggleMute={toggleMute}
            onToggleVideo={toggleVideo}
            onSwitchCamera={switchCamera}
            onToggleSpeaker={toggleSpeaker}
            onEnd={leave}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default GroupVideoCallScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  preJoin: { paddingTop: 8, paddingBottom: 24 },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    gap: 10,
  },
  startText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
  videoArea: { flex: 1, margin: 12, borderRadius: 16, overflow: 'hidden' },
  placeholder: {
    flex: 1,
    minHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceVariant,
  },
  remoteTile: {
    width: 200,
    height: 280,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.black,
  },
  uidLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  localPip: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  count: { textAlign: 'center', fontSize: 14, marginBottom: 4 },
});
