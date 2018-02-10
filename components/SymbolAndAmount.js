import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default (props)=> {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{props.item.asset}</Text>
      <Text style={styles.itemValue}>{parseFloat(props.item.free)}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
  item: {
    width: 80,
  },
  itemTitle: {
    color: '#D8DADD',
    width: '100%',
    marginBottom: 4,
    fontSize: 18,
  },
  itemValue: {
    color: '#A2A2A5',
    width: '100%',
    fontSize: 12,
  },
});
