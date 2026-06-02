// LiveStreamScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Radio,
  Mic,
} from 'lucide-react-native';
import { RtcSurfaceView, VideoSourceType } from 'react-native-agora';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraLiveStream } from '../hooks/useAgoraLiveStream';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { CallControls } from '../components/agora/CallControls';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'LiveStream')!;

const { width } = Dimensions.get('window');

const LiveStreamScreen = () => {
  const isDarkMode = true;
  const theme = getThemeColors(isDarkMode);

  const {
    channelName,
    isJoined,
    isMuted,
    isVideoEnabled,
    startStream,
    endStream,
    toggleMute,
    toggleVideo,
    switchCamera,
  } = useAgoraLiveStream();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      {!isJoined && (
        <DemoBanner
          channel={channelName}
          sdkFeature={meta.sdkFeature}
          testHint={meta.testHint}
        />
      )}

      {isJoined && (
        <View style={styles.liveBadgeRow}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
      )}

      {/* Video Preview */}
      <View style={styles.videoContainer}>
        {isJoined ? (
          <RtcSurfaceView
            style={StyleSheet.absoluteFill}
            canvas={{ sourceType: VideoSourceType.VideoSourceCamera }}
          />
        ) : (
          <View style={styles.placeholder}>
            <Radio size={80} color={theme.textSecondary} />
            <Text
              style={[styles.placeholderText, { color: theme.textSecondary }]}
            >
              Ready to broadcast
            </Text>
          </View>
        )}
      </View>

      {/* Info Card */}
      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <View
          style={[styles.iconContainer, { backgroundColor: Colors.highlight }]}
        >
          <Radio size={32} color={Colors.primary} />
        </View>
        <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
          {isJoined ? 'Streaming Active' : 'Live Stream Ready'}
        </Text>
        <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>
          {isJoined ? `Channel: ${channelName}` : 'Tap Start to go live'}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        {!isJoined ? (
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: Colors.primary }]}
            onPress={async () => {
              if (await ensureFeaturePermissions('liveStream')) {
                startStream();
              }
            }}
          >
            <Mic size={24} color={Colors.white} />
            <Text style={styles.controlButtonText}>Start Streaming</Text>
          </TouchableOpacity>
        ) : (
          <CallControls
            isMuted={isMuted}
            isVideoEnabled={isVideoEnabled}
            onToggleMute={toggleMute}
            onToggleVideo={toggleVideo}
            onSwitchCamera={switchCamera}
            onEnd={endStream}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LiveStreamScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  liveBadgeRow: { alignItems: 'center', paddingTop: 12, paddingBottom: 4 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  liveText: { color: Colors.white, fontWeight: 'bold', fontSize: 14 },
  videoContainer: {
    width: width * 0.9,
    height: width * 0.5,
    backgroundColor: Colors.black,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceVariant,
  },
  placeholderText: { marginTop: 16, fontSize: 16 },
  card: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  cardDescription: { fontSize: 15, lineHeight: 22 },
  controlsContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginTop: 20,
  },
  controlButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
});
