import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic2 } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraVoiceEffects } from '../hooks/useAgoraVoiceEffects';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'VoiceEffects')!;

const VoiceEffectsScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    remoteUid,
    activePresetId,
    presets,
    isMuted,
    speakerOn,
    join,
    leave,
    applyPreset,
    toggleMute,
    toggleSpeaker,
  } = useAgoraVoiceEffects();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {!isJoined && (
          <DemoBanner
            channel={channelName}
            sdkFeature={meta.sdkFeature}
            testHint={meta.testHint}
          />
        )}

        {isJoined && (
          <View style={[styles.statusCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statusText, { color: theme.textSecondary }]}>
              {remoteUid != null
                ? `Connected with UID ${remoteUid} — speak to hear effects`
                : 'Waiting for a peer… speak to preview your voice effect'}
            </Text>
          </View>
        )}

        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
          PRESETS
        </Text>
        <View style={styles.presetGrid}>
          {presets.map(p => (
            <TouchableOpacity
              key={p.id}
              disabled={!isJoined}
              style={[
                styles.presetBtn,
                {
                  backgroundColor:
                    activePresetId === p.id ? Colors.highlight : theme.surface,
                  opacity: isJoined ? 1 : 0.5,
                },
              ]}
              onPress={() => applyPreset(p.preset, p.id)}
            >
              <Text
                style={{
                  color:
                    activePresetId === p.id ? Colors.primary : theme.textPrimary,
                  fontWeight: '600',
                  fontSize: 13,
                }}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.controls}>
          {!isJoined ? (
            <TouchableOpacity
              style={[styles.startBtn, { backgroundColor: Colors.primary }]}
              onPress={async () => {
                if (await ensureFeaturePermissions('voiceEffects')) {
                  await join();
                }
              }}
            >
              <Mic2 size={22} color={Colors.white} />
              <Text style={styles.startText}>Join voice channel</Text>
            </TouchableOpacity>
          ) : (
            <CallControls
              isMuted={isMuted}
              speakerOn={speakerOn}
              onToggleMute={toggleMute}
              onToggleSpeaker={toggleSpeaker}
              onEnd={leave}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VoiceEffectsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 8, paddingBottom: 24 },
  statusCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
  },
  statusText: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  sectionLabel: {
    marginHorizontal: 20,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 8,
  },
  presetBtn: {
    width: '47%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  controls: { marginTop: 20 },
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
