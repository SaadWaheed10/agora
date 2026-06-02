import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Activity, Square } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraNetworkProbe } from '../hooks/useAgoraNetworkProbe';
import { DemoBanner } from '../components/agora/DemoBanner';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'NetworkProbe')!;

function formatBandwidth(bps?: number) {
  if (bps == null) {
    return '—';
  }
  return `${Math.round(bps / 1000)} kbps`;
}

const NetworkProbeScreen = () => {
  const theme = getThemeColors(true);
  const { isRunning, result, error, start, stop } = useAgoraNetworkProbe();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.content}>
        <DemoBanner
          channel="(no channel)"
          sdkFeature={meta.sdkFeature}
          testHint={meta.testHint}
        />

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          {isRunning ? (
            <>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Probing network…
              </Text>
              <Text style={[styles.body, { color: theme.textSecondary }]}>
                Testing uplink and downlink quality. This takes up to 30 seconds.
              </Text>
            </>
          ) : result ? (
            <>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Probe complete
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                RTT: {result.rtt ?? '—'} ms
              </Text>
              <Text style={[styles.section, { color: theme.textSecondary }]}>
                UPLINK
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                Packet loss: {result.uplinkReport?.packetLossRate ?? '—'}%
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                Jitter: {result.uplinkReport?.jitter ?? '—'} ms
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                Bandwidth: {formatBandwidth(result.uplinkReport?.availableBandwidth)}
              </Text>
              <Text style={[styles.section, { color: theme.textSecondary }]}>
                DOWNLINK
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                Packet loss: {result.downlinkReport?.packetLossRate ?? '—'}%
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                Jitter: {result.downlinkReport?.jitter ?? '—'} ms
              </Text>
              <Text style={[styles.stat, { color: theme.textPrimary }]}>
                Bandwidth: {formatBandwidth(result.downlinkReport?.availableBandwidth)}
              </Text>
            </>
          ) : (
            <>
              <Activity size={48} color={Colors.primary} />
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Last-mile probe
              </Text>
              <Text style={[styles.body, { color: theme.textSecondary }]}>
                Measure connection quality to Agora edge servers before you go live.
              </Text>
              {error ? (
                <Text style={[styles.error, { color: Colors.error }]}>{error}</Text>
              ) : null}
            </>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: isRunning ? Colors.error : Colors.primary },
          ]}
          onPress={isRunning ? stop : start}
        >
          {isRunning ? (
            <Square size={22} color={Colors.white} />
          ) : (
            <Activity size={22} color={Colors.white} />
          )}
          <Text style={styles.btnText}>
            {isRunning ? 'Cancel probe' : result ? 'Run again' : 'Start probe'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NetworkProbeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingTop: 8 },
  card: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'stretch',
  },
  title: { fontSize: 20, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  body: { fontSize: 15, lineHeight: 22, textAlign: 'center' },
  section: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    alignSelf: 'flex-start',
    marginTop: 14,
    marginBottom: 6,
  },
  stat: { fontSize: 15, alignSelf: 'flex-start', marginBottom: 4 },
  error: { marginTop: 12, fontSize: 14, textAlign: 'center' },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 14,
    gap: 10,
  },
  btnText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
});
