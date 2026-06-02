import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Repeat, Square } from 'lucide-react-native';
import Colors, { getThemeColors } from '../constants/colors';
import { useAgoraEchoTest } from '../hooks/useAgoraEchoTest';
import { ensureFeaturePermissions } from '../hooks/usePermission';
import { DemoBanner } from '../components/agora/DemoBanner';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const meta = AGORA_FEATURES.find(f => f.route === 'EchoTest')!;

const EchoTestScreen = () => {
  const theme = getThemeColors(true);
  const { channelId, isRunning, start, stop } = useAgoraEchoTest();

  const handleStart = async () => {
    if (await ensureFeaturePermissions('echoTest')) {
      start();
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.content}>
        <DemoBanner
          channel={channelId}
          sdkFeature={meta.sdkFeature}
          testHint={meta.testHint}
        />

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Repeat size={48} color={Colors.warning} />
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {isRunning ? 'Echo test running' : 'Ready to test'}
          </Text>
          <Text style={[styles.body, { color: theme.textSecondary }]}>
            {isRunning
              ? 'Speak into the microphone. You should hear your voice looped back after about 2 seconds.'
              : 'This tests your mic and speaker without joining a channel with another user.'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: isRunning ? Colors.error : Colors.primary },
          ]}
          onPress={isRunning ? stop : handleStart}
        >
          {isRunning ? (
            <Square size={22} color={Colors.white} />
          ) : (
            <Repeat size={22} color={Colors.white} />
          )}
          <Text style={styles.btnText}>{isRunning ? 'Stop echo test' : 'Start echo test'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EchoTestScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingTop: 8 },
  card: {
    marginHorizontal: 20,
    padding: 28,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 20, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  body: { fontSize: 15, lineHeight: 22, textAlign: 'center' },
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
