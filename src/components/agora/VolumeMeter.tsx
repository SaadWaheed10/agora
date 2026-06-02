import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, getThemeColors } from '../../constants';

type Props = {
  label: string;
  volume: number;
  maxVolume?: number;
};

export function VolumeMeter({ label, volume, maxVolume = 255 }: Props) {
  const theme = getThemeColors(true);
  const ratio = Math.min(1, volume / maxVolume);

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.textPrimary }]} numberOfLines={1}>
        {label}
      </Text>
      <View style={[styles.track, { backgroundColor: theme.surfaceVariant }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.max(ratio * 100, 4)}%`,
              backgroundColor: ratio > 0.6 ? Colors.primary : Colors.primaryLight,
            },
          ]}
        />
      </View>
      <Text style={[styles.value, { color: theme.textSecondary }]}>{volume}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  label: { width: 88, fontSize: 14, fontWeight: '600' },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 5 },
  value: { width: 36, fontSize: 12, textAlign: 'right', fontVariant: ['tabular-nums'] },
});
