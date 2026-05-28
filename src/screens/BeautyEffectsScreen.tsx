import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import { Sparkles, Phone } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraBeauty } from '../hooks/useAgoraBeauty';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'BeautyEffects')!;

const BeautyEffectsScreen = () => {
  const theme = getThemeColors(true);
  const {
    channelName,
    isJoined,
    beautyOn,
    levels,
    isMuted,
    join,
    leave,
    toggleBeauty,
    updateLevels,
    toggleMute,
    switchCamera,
  } = useAgoraBeauty();

  const slider = (
    label: string,
    key: 'smoothness' | 'lightening' | 'redness',
    step = 0.1,
  ) => (
    <View style={styles.sliderRow}>
      <Text style={[styles.sliderLabel, { color: theme.textPrimary }]}>
        {label} ({levels[key].toFixed(1)})
      </Text>
      <View style={styles.sliderBtns}>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() =>
            updateLevels({
              ...levels,
              [key]: Math.max(0, levels[key] - step),
            })
          }
        >
          <Text style={styles.stepText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() =>
            updateLevels({
              ...levels,
              [key]: Math.min(1, levels[key] + step),
            })
          }
        >
          <Text style={styles.stepText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
              if (await ensureFeaturePermissions('beauty')) {
                await join();
              }
            }}
          >
            <Phone size={22} color={Colors.white} />
            <Text style={styles.startText}>Start camera with beauty</Text>
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
            <View style={styles.toggleRow}>
              <Sparkles size={22} color={Colors.secondary} />
              <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
                Beauty enabled
              </Text>
              <Switch value={beautyOn} onValueChange={toggleBeauty} />
            </View>
            {slider('Smoothness', 'smoothness')}
            {slider('Lightening', 'lightening')}
            {slider('Redness', 'redness')}
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

export default BeautyEffectsScreen;

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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  toggleLabel: { flex: 1, fontSize: 16, fontWeight: '600' },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderLabel: { flex: 1, fontSize: 14 },
  sliderBtns: { flexDirection: 'row', gap: 8 },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: { color: Colors.white, fontSize: 20, fontWeight: '600' },
});
