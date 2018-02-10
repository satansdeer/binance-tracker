import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default (props)=> {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.forName]}>Name</Text>
      <Text style={styles.text}>Change</Text>
      <Text style={[styles.text, styles.forPercentage]}>%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    width: '100%'
  },
  text: {
    color: '#A7AAAD',
    textAlign: 'center',
    width: '30%',
    fontSize: 16,
  },
  forName: {
    textAlign: 'left',
  },
  forPercentage: {
    textAlign: 'right',
    paddingRight: 14,
  }
});

