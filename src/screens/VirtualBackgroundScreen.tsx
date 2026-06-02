import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import { Layers } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraVirtualBackground } from '../hooks/useAgoraVirtualBackground';
import type { VirtualBgMode } from '../hooks/useAgoraVirtualBackground';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'VirtualBackground')!;

const MODES: { id: VirtualBgMode; label: string }[] = [
  { id: 'off', label: 'Off' },
  { id: 'blur', label: 'Blur' },
  { id: 'color', label: 'Solid' },
];

const VirtualBackgroundScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    mode,
    isMuted,
    join,
    leave,
    setMode,
    toggleMute,
    switchCamera,
  } = useAgoraVirtualBackground();

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
              if (await ensureFeaturePermissions('virtualBackground')) {
                await join();
              }
            }}
          >
            <Layers size={22} color={Colors.white} />
            <Text style={styles.startText}>Start camera</Text>
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
              Background mode
            </Text>
            <View style={styles.modeRow}>
              {MODES.map(m => (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.modeBtn,
                    {
                      backgroundColor:
                        mode === m.id ? Colors.highlight : theme.surfaceVariant,
                    },
                  ]}
                  onPress={() => setMode(m.id)}
                >
                  <Text
                    style={{
                      color: mode === m.id ? Colors.primary : theme.textPrimary,
                      fontWeight: '600',
                    }}
                  >
                    {m.label}
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

export default VirtualBackgroundScreen;

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
    minHeight: 280,
  },
  panel: { marginHorizontal: 12, padding: 14, borderRadius: 12, marginBottom: 8 },
  panelTitle: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  modeRow: { flexDirection: 'row', gap: 8 },
  modeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
