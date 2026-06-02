import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView } from 'react-native-agora';
import { UserPlus, Users } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraLiveCoHost } from '../hooks/useAgoraLiveCoHost';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'LiveCoHost')!;

const LiveCoHostScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    role,
    hostUid,
    isMuted,
    isVideoEnabled,
    videoSourceType,
    join,
    leave,
    setRole,
    toggleMute,
    toggleVideo,
    switchCamera,
  } = useAgoraLiveCoHost();

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
              if (await ensureFeaturePermissions('liveCoHost')) {
                await join();
              }
            }}
          >
            <UserPlus size={22} color={Colors.white} />
            <Text style={styles.startText}>Join as audience</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <View style={styles.videoArea}>
            {role === 'broadcaster' ? (
              <RtcSurfaceView
                style={StyleSheet.absoluteFill}
                canvas={{ sourceType: videoSourceType }}
              />
            ) : hostUid != null ? (
              <RtcSurfaceView
                style={StyleSheet.absoluteFill}
                canvas={{ uid: hostUid }}
              />
            ) : (
              <View style={styles.placeholder}>
                <Users size={48} color={theme.textSecondary} />
                <Text style={[styles.waitText, { color: theme.textSecondary }]}>
                  No host yet — promote yourself to broadcaster or wait for a host.
                </Text>
              </View>
            )}
          </View>

          <View style={[styles.rolePanel, { backgroundColor: theme.surface }]}>
            <Text style={[styles.roleLabel, { color: theme.textSecondary }]}>
              YOUR ROLE
            </Text>
            <Text style={[styles.roleValue, { color: theme.textPrimary }]}>
              {role === 'broadcaster' ? 'Broadcaster (co-host)' : 'Audience'}
            </Text>
            <View style={styles.roleBtns}>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  {
                    backgroundColor:
                      role === 'audience' ? Colors.highlight : theme.surfaceVariant,
                  },
                ]}
                onPress={() => setRole('audience')}
              >
                <Text
                  style={{
                    color: role === 'audience' ? Colors.primary : theme.textPrimary,
                    fontWeight: '600',
                  }}
                >
                  Audience
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  {
                    backgroundColor:
                      role === 'broadcaster' ? Colors.highlight : theme.surfaceVariant,
                  },
                ]}
                onPress={() => setRole('broadcaster')}
              >
                <Text
                  style={{
                    color:
                      role === 'broadcaster' ? Colors.primary : theme.textPrimary,
                    fontWeight: '600',
                  }}
                >
                  Go live
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {role === 'broadcaster' ? (
            <CallControls
              isMuted={isMuted}
              isVideoEnabled={isVideoEnabled}
              onToggleMute={toggleMute}
              onToggleVideo={toggleVideo}
              onSwitchCamera={switchCamera}
              onEnd={leave}
            />
          ) : (
            <TouchableOpacity
              style={[styles.leaveBtn, { backgroundColor: Colors.error }]}
              onPress={leave}
            >
              <Text style={styles.leaveText}>Leave channel</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default LiveCoHostScreen;

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
  videoArea: {
    flex: 1,
    margin: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.black,
    minHeight: 280,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  waitText: { marginTop: 12, textAlign: 'center', lineHeight: 22 },
  rolePanel: {
    marginHorizontal: 12,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  roleLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  roleValue: { fontSize: 16, fontWeight: '700', marginTop: 4, marginBottom: 12 },
  roleBtns: { flexDirection: 'row', gap: 10 },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  leaveBtn: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  leaveText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
