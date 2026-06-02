import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Monitor, Mic, MicOff, PhoneOff } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';
import { useAgoraScreenShare } from '../hooks/useAgoraScreenShare';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'ScreenShare')!;

const ScreenShareScreen = () => {
  const themeColors = getThemeColors(true);
  const { channelName, isSharing, isMuted, startShare, stopShare, toggleMute } =
    useAgoraScreenShare();

  const handleStart = async () => {
    if (await ensureFeaturePermissions('screenShare')) {
      await startShare();
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DemoBanner
          channel={channelName}
          sdkFeature={meta.sdkFeature}
          testHint={meta.testHint}
        />

        <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
          <View style={styles.iconContainer}>
            <Monitor size={32} color={Colors.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
            {isSharing ? 'Screen share active' : 'Start Screen Share'}
          </Text>
          <Text
            style={[styles.cardDescription, { color: themeColors.textSecondary }]}
          >
            {isSharing
              ? 'Others in the channel can see your screen'
              : Platform.OS === 'android'
                ? 'Share your entire screen with others in the channel'
                : 'Screen share is supported on Android'}
          </Text>
        </View>

        <View style={styles.controlsContainer}>
          {!isSharing ? (
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: Colors.primary }]}
              onPress={handleStart}
            >
              <Monitor size={24} color={Colors.white} />
              <Text style={styles.controlButtonText}>Start Screen Share</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.controlButton, isMuted && styles.mutedButton]}
                onPress={toggleMute}
              >
                {isMuted ? (
                  <MicOff size={24} color={Colors.white} />
                ) : (
                  <Mic size={24} color={Colors.white} />
                )}
                <Text style={styles.controlButtonText}>
                  {isMuted ? 'Unmute' : 'Mute'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.endButton]}
                onPress={stopShare}
              >
                <PhoneOff size={24} color={Colors.white} />
                <Text style={styles.controlButtonText}>Stop Sharing</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 8 },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  cardDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  controlsContainer: { marginTop: 20, gap: 12 },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    backgroundColor: Colors.gray[800],
  },
  controlButtonText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  mutedButton: { backgroundColor: Colors.error },
  endButton: { backgroundColor: Colors.error },
});

export default ScreenShareScreen;
