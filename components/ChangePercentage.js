import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default ({value}) => (
    <View style={value > 0 ? styles.containerPositive : styles.containerNegative}>
      <Text style={value}>{value}%</Text>
    </View>
  )


const styles = StyleSheet.create({
  containerPositive: {
    alignItems: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 2,
    backgroundColor: '#5E731E',
  },
  containerNegative: {
    alignItems: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 2,
    backgroundColor: '#840B53',
  },
  value: {
    color: '#D8DADD',
    textAlign: 'center',
    fontSize: 18,
    width: 50,
  },
});

