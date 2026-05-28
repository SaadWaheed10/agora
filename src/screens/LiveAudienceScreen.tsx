import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView } from 'react-native-agora';
import { Eye, Radio } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraLiveAudience } from '../hooks/useAgoraLiveAudience';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'LiveAudience')!;

const LiveAudienceScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    hostUid,
    speakerOn,
    join,
    leave,
    toggleSpeaker,
  } = useAgoraLiveAudience();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
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
              if (await ensureFeaturePermissions('liveAudience')) {
                await join();
              }
            }}
          >
            <Eye size={22} color={Colors.white} />
            <Text style={styles.startText}>Join as audience</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <View style={styles.videoArea}>
            {hostUid != null ? (
              <RtcSurfaceView
                style={StyleSheet.absoluteFill}
                canvas={{ uid: hostUid }}
              />
            ) : (
              <View style={styles.placeholder}>
                <Radio size={48} color={theme.textSecondary} />
                <Text style={[styles.waitText, { color: theme.textSecondary }]}>
                  No host in {channelName} yet. Start Live Stream (Host) on another device.
                </Text>
              </View>
            )}
          </View>
          <CallControls
            speakerOn={speakerOn}
            onToggleSpeaker={toggleSpeaker}
            onEnd={leave}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LiveAudienceScreen;

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
    minHeight: 320,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  waitText: { marginTop: 16, textAlign: 'center', lineHeight: 22 },
});
