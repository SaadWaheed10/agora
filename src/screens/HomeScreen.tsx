import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Home } from 'lucide-react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Home size={48} color="#007AFF" />
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to your home screen</Text>
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

export default HomeScreen;
