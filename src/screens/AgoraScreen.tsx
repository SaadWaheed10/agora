import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Video } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';

const AgoraScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = getThemeColors(isDarkMode);

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Video size={48} color={Colors.secondary} />
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>
        Agora
      </Text>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
        Video calling and live streaming
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AgoraScreen;
