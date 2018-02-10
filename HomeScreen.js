import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react'
import SymbolAndAmount from './components/SymbolAndAmount'
import AmountInBtcAndUsd from './components/AmountInBtcAndUsd'
import ChangePercentage from './components/ChangePercentage'
import CurrenciesListHeader from './components/CurrenciesListHeader'

@inject('apiKeysStore', 'binanceApiStore')
@observer
export default class HomeScreen extends React.Component {
  async componentDidMount() {
    await this.props.apiKeysStore.loadApiKeys()
    try{
      await this.props.binanceApiStore.loadBookTickers()
      await this.props.binanceApiStore.loadAccountData()
    }catch(e){
      this.props.navigation.navigate('Profile')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CurrenciesListHeader />
        <FlatList
          style={styles.list}
          data={this.props.binanceApiStore.computedBalances}
          keyExtractor={item => item.asset}
          renderItem={({item}) =>
            <View style={styles.item}>
              <SymbolAndAmount style={styles.itemSection} item={item} />
              <AmountInBtcAndUsd style={styles.itemSection} volUsd={item.usdPrice} volBtc={item.btcPrice} />
              <ChangePercentage value={Math.ceil(Math.random()*100)-50} style={styles.itemSection} />
            </View>
            }
        />
        <TouchableOpacity style={styles.secretsButton} onPress={()=> this.props.navigation.navigate('Profile')} >
          <Text style={styles.secretsButtonText}>{'Set API_KEY & API_SECRET'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272C36',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 45,
  },
  list: {
    backgroundColor: '#1B1D22',
    width: '100%',
    height: '100%',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#24262C',
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
  },
  itemSection: {
    width: '33%',
  },
  secretsButton: {
    borderWidth: 1,
    borderColor: '#DDBC44',
    padding: 8,
    marginTop: 15,
    marginBottom: 45,
  },
  secretsButtonText: {
    color: '#DDBC44'
  }
});

