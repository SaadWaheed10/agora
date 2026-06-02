import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Menu } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

export type ScreenHeaderLeftAction = 'back' | 'menu';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  leftAction?: ScreenHeaderLeftAction;
  onLeftPress?: () => void;
  rightElement?: React.ReactNode;
};

export function ScreenHeader({
  title,
  subtitle,
  leftAction = 'back',
  onLeftPress,
  rightElement,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const themeColors = getThemeColors(true);

  const Icon = leftAction === 'menu' ? Menu : ChevronLeft;

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top + 8,
          backgroundColor: themeColors.surface,
          borderBottomColor: themeColors.border,
        },
      ]}
    >
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: themeColors.surfaceVariant }]}
          onPress={onLeftPress}
          accessibilityRole="button"
          accessibilityLabel={leftAction === 'menu' ? 'Open menu' : 'Go back'}
        >
          <Icon size={24} color={Colors.primary} />
        </TouchableOpacity>

        <View style={styles.titleBlock}>
          <Text
            style={[styles.title, { color: themeColors.textPrimary }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[styles.subtitle, { color: themeColors.textSecondary }]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {rightElement ? (
          <View style={styles.rightSlot}>{rightElement}</View>
        ) : (
          <View style={styles.iconButtonPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonPlaceholder: {
    width: 44,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  rightSlot: {
    minWidth: 44,
    alignItems: 'flex-end',
  },
});
