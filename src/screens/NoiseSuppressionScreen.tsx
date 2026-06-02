import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView, VideoSourceType, AudioAinsMode } from 'react-native-agora';
import { Shield } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraNoiseSuppression } from '../hooks/useAgoraNoiseSuppression';
import type { AinsModeOption } from '../hooks/useAgoraNoiseSuppression';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'NoiseSuppression')!;

const AINS_OPTIONS: { id: AinsModeOption; label: string }[] = [
  { id: 'off', label: 'Off' },
  { id: AudioAinsMode.AinsModeBalanced, label: 'Balanced' },
  { id: AudioAinsMode.AinsModeAggressive, label: 'Aggressive' },
  { id: AudioAinsMode.AinsModeUltralowlatency, label: 'Low latency' },
];

const NoiseSuppressionScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    ainsMode,
    isMuted,
    join,
    leave,
    setAinsMode,
    toggleMute,
    switchCamera,
  } = useAgoraNoiseSuppression();

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
              if (await ensureFeaturePermissions('noiseSuppression')) {
                await join();
              }
            }}
          >
            <Shield size={22} color={Colors.white} />
            <Text style={styles.startText}>Join with camera</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <View style={styles.preview}>
            <RtcSurfaceView
              style={StyleSheet.absoluteFill}
              canvas={{ sourceType: VideoSourceType.VideoSourceCamera }}
            />
          </View>
          <View style={[styles.panel, { backgroundColor: theme.surface }]}>
            <Text style={[styles.panelTitle, { color: theme.textPrimary }]}>
              AINS mode
            </Text>
            <View style={styles.modeWrap}>
              {AINS_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={String(opt.id)}
                  style={[
                    styles.modeBtn,
                    {
                      backgroundColor:
                        ainsMode === opt.id ? Colors.highlight : theme.surfaceVariant,
                    },
                  ]}
                  onPress={() => setAinsMode(opt.id)}
                >
                  <Text
                    style={{
                      color: ainsMode === opt.id ? Colors.primary : theme.textPrimary,
                      fontWeight: '600',
                      fontSize: 13,
                    }}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <CallControls
            isMuted={isMuted}
            onToggleMute={toggleMute}
            onSwitchCamera={switchCamera}
            onEnd={leave}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default NoiseSuppressionScreen;

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
  preview: {
    flex: 1,
    margin: 12,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 240,
  },
  panel: { marginHorizontal: 12, padding: 14, borderRadius: 12, marginBottom: 8 },
  panelTitle: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  modeWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  modeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});
