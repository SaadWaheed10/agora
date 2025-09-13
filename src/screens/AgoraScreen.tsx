import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'lucide-react-native';

const AgoraScreen = () => {
  return (
    <View style={styles.container}>
      <Video size={48} color="#FF6B6B" />
      <Text style={styles.title}>Agora</Text>
      <Text style={styles.subtitle}>Video calling and live streaming</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
});

export default AgoraScreen;
