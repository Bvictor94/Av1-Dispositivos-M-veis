import React from 'react';
import { View, StyleSheet } from 'react-native';
import Olimpiadas from './olimpiadas';

export default function App() {
  return (
    <View style={styles.MainContainer}>
      <Olimpiadas />
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
