import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Scanner from './app/(tabs)/scanner';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0f' }}>
      <StatusBar barStyle="light-content" />
      <Scanner />
    </SafeAreaView>
  );
}
