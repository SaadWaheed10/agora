import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, getThemeColors } from '../constants';
import { appId } from '../constants/agoraConstants';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { AGORA_FEATURES } from '../constants/agoraFeatures';

const AgoraGuideScreen = () => {
  const theme = getThemeColors(true);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.body, { color: theme.textSecondary }]}>
          This app demonstrates react-native-agora v4 APIs. Use two physical devices
          or simulators with camera enabled for the best results.
        </Text>

        <Section title="App ID" theme={theme}>
          <Text style={[styles.mono, { color: Colors.primary }]}>{appId}</Text>
          <Text style={[styles.body, { color: theme.textSecondary }]}>
            Replace with your own App ID from the Agora Console. Token is null (testing
            mode); enable token auth in production.
          </Text>
        </Section>

        <Section title="Demo channels" theme={theme}>
          {Object.entries(AGORA_CHANNELS).map(([key, value]) => (
            <Text key={key} style={[styles.channelLine, { color: theme.textPrimary }]}>
              {key}: <Text style={styles.mono}>{value}</Text>
            </Text>
          ))}
        </Section>

        <Section title="Features in this app" theme={theme}>
          {AGORA_FEATURES.filter(f => f.route !== 'AgoraGuide').map(f => (
            <View key={f.route} style={styles.featureBlock}>
              <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                {f.title}
              </Text>
              <Text style={[styles.body, { color: theme.textSecondary }]}>
                {f.description}
              </Text>
              <Text style={[styles.sdk, { color: Colors.primaryLight }]}>
                {f.sdkFeature}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Testing tips" theme={theme}>
          <Bullet theme={theme} text="Live host + audience: open Host on phone A, Audience on phone B." />
          <Bullet theme={theme} text="Group call: join the same group channel on 3+ devices." />
          <Bullet theme={theme} text="iOS Simulator: enable I/O → Camera; grant mic permission." />
          <Bullet theme={theme} text="Screen share: Android only in this demo (MediaProjection)." />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

function Section({
  title,
  theme,
  children,
}: {
  title: string;
  theme: ReturnType<typeof getThemeColors>;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text, theme }: { text: string; theme: ReturnType<typeof getThemeColors> }) {
  return (
    <Text style={[styles.bullet, { color: theme.textSecondary }]}>• {text}</Text>
  );
}

export default AgoraGuideScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  body: { fontSize: 15, lineHeight: 22, marginBottom: 8 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  mono: { fontFamily: 'Menlo', fontSize: 13 },
  channelLine: { fontSize: 14, marginBottom: 6 },
  featureBlock: { marginBottom: 16 },
  featureTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  sdk: { fontSize: 12, marginTop: 4 },
  bullet: { fontSize: 14, lineHeight: 22, marginBottom: 6 },
});
