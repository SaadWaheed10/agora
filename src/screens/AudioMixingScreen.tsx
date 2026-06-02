import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Music, Pause, Play, Square } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraAudioMixing } from '../hooks/useAgoraAudioMixing';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'AudioMixing')!;

const AudioMixingScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    mixUrl,
    isJoined,
    mixState,
    positionMs,
    isMuted,
    join,
    leave,
    startMixing,
    stopMixing,
    pauseMixing,
    resumeMixing,
    toggleMute,
  } = useAgoraAudioMixing();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <DemoBanner
          channel={channelName}
          sdkFeature={meta.sdkFeature}
          testHint={meta.testHint}
        />

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Music size={36} color={Colors.accent} />
          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
            {mixState === 'playing'
              ? 'Playing mix'
              : mixState === 'paused'
                ? 'Paused'
                : mixState === 'failed'
                  ? 'Failed to load track'
                  : 'Demo track'}
          </Text>
          <Text style={[styles.url, { color: theme.textSecondary }]} numberOfLines={2}>
            {mixUrl}
          </Text>
          {mixState === 'playing' || mixState === 'paused' ? (
            <Text style={[styles.position, { color: Colors.primary }]}>
              Position: {Math.round(positionMs / 1000)}s
            </Text>
          ) : null}
        </View>

        {isJoined && (
          <View style={styles.mixControls}>
            {mixState === 'idle' || mixState === 'failed' ? (
              <TouchableOpacity
                style={[styles.mixBtn, { backgroundColor: Colors.primary }]}
                onPress={startMixing}
              >
                <Play size={22} color={Colors.white} />
                <Text style={styles.mixBtnText}>Play music</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.mixBtn, { backgroundColor: Colors.gray[800] }]}
                  onPress={mixState === 'paused' ? resumeMixing : pauseMixing}
                >
                  <Pause size={22} color={Colors.white} />
                  <Text style={styles.mixBtnText}>
                    {mixState === 'paused' ? 'Resume' : 'Pause'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.mixBtn, { backgroundColor: Colors.error }]}
                  onPress={stopMixing}
                >
                  <Square size={22} color={Colors.white} />
                  <Text style={styles.mixBtnText}>Stop music</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <View style={styles.controls}>
          {!isJoined ? (
            <TouchableOpacity
              style={[styles.startBtn, { backgroundColor: Colors.primary }]}
              onPress={async () => {
                if (await ensureFeaturePermissions('audioMixing')) {
                  await join();
                }
              }}
            >
              <Music size={22} color={Colors.white} />
              <Text style={styles.startText}>Join channel</Text>
            </TouchableOpacity>
          ) : (
            <CallControls isMuted={isMuted} onToggleMute={toggleMute} onEnd={leave} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AudioMixingScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 8, paddingBottom: 24 },
  card: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginTop: 12 },
  url: { fontSize: 11, marginTop: 8, textAlign: 'center', fontFamily: 'Menlo' },
  position: { marginTop: 10, fontSize: 15, fontWeight: '600' },
  mixControls: { paddingHorizontal: 16, gap: 10, marginBottom: 12 },
  mixBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  mixBtnText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  controls: { marginTop: 8 },
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
});
