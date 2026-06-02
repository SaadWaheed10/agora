import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart3 } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraVolumeIndicator } from '../hooks/useAgoraVolumeIndicator';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { VolumeMeter } from '../components/agora/VolumeMeter';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'VolumeIndicator')!;

const VolumeIndicatorScreen = () => {
  const theme = getThemeColors(true);
  const { channelName, isJoined, speakers, isMuted, join, leave, toggleMute } =
    useAgoraVolumeIndicator();

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

        <View style={[styles.meterCard, { backgroundColor: theme.surface }]}>
          <BarChart3 size={28} color={Colors.primary} />
          <Text style={[styles.meterTitle, { color: theme.textPrimary }]}>
            Speaking volume
          </Text>
          {!isJoined ? (
            <Text style={[styles.hint, { color: theme.textSecondary }]}>
              Join the channel to see live volume meters.
            </Text>
          ) : speakers.length === 0 ? (
            <Text style={[styles.hint, { color: theme.textSecondary }]}>
              Speak into the mic — meters update every 200ms.
            </Text>
          ) : (
            speakers.map(s => (
              <VolumeMeter
                key={`${s.uid}-${s.isLocal}`}
                label={s.isLocal ? 'You' : `UID ${s.uid}`}
                volume={s.volume}
              />
            ))
          )}
        </View>

        <View style={styles.controls}>
          {!isJoined ? (
            <TouchableOpacity
              style={[styles.startBtn, { backgroundColor: Colors.primary }]}
              onPress={async () => {
                if (await ensureFeaturePermissions('volumeIndicator')) {
                  await join();
                }
              }}
            >
              <BarChart3 size={22} color={Colors.white} />
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

export default VolumeIndicatorScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 8, paddingBottom: 24 },
  meterCard: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
  },
  meterTitle: { fontSize: 17, fontWeight: '700', marginTop: 10, marginBottom: 12 },
  hint: { fontSize: 14, lineHeight: 20 },
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
