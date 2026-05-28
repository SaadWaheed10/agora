import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, getThemeColors } from '../../constants';

type Props = {
  channel: string;
  sdkFeature: string;
  testHint: string;
};

export function DemoBanner({ channel, sdkFeature, testHint }: Props) {
  const theme = getThemeColors(true);

  return (
    <View style={[styles.box, { backgroundColor: theme.surface }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>CHANNEL</Text>
      <Text style={[styles.channel, { color: Colors.primary }]}>{channel}</Text>
      <Text style={[styles.sdk, { color: theme.textSecondary }]}>{sdkFeature}</Text>
      <Text style={[styles.hint, { color: theme.textPrimary }]}>{testHint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 132, 255, 0.25)',
  },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  channel: { fontSize: 16, fontWeight: '700', marginBottom: 8, fontFamily: 'Menlo' },
  sdk: { fontSize: 12, lineHeight: 18, marginBottom: 8 },
  hint: { fontSize: 13, lineHeight: 19, fontWeight: '500' },
});
