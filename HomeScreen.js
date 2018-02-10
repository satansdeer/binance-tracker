import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react'
import SymbolAndAmount from './components/SymbolAndAmount'
import AmountInBtcAndUsd from './components/AmountInBtcAndUsd'
import ChangePercentage from './components/ChangePercentage'
import CurrenciesListHeader from './components/CurrenciesListHeader'

@inject('apiKeysStore', 'binanceApiStore')
@observer
export default class HomeScreen extends Component {
  randomValue = Math.ceil(Math.random()*100)-50;
  async componentDidMount() {
    const {apiKeysStore, binanceApiStore, navigation} = this.props;
    await apiKeysStore.loadApiKeys();
    try{
      await binanceApiStore.loadBookTickers();
      await binanceApiStore.loadAccountData();
    }catch(e){
      navigation.navigate('Profile');
    }
  }

  render() {
    const {binanceApiStore, navigation} = this.props;

    return (
      <View style={styles.container}>
        <CurrenciesListHeader />
        <FlatList
          style={styles.list}
          data={binanceApiStore.computedBalances}
          keyExtractor={item => item.asset}
          renderItem={({item}) =>
              <View style={styles.item}>
                <SymbolAndAmount style={styles.itemSection} item={item} />
                <AmountInBtcAndUsd style={styles.itemSection} volUsd={item.usdPrice} volBtc={item.btcPrice} />
                <ChangePercentage value={this.randomValue} style={styles.itemSection} />
              </View>
            }
        />
        <TouchableOpacity style={styles.secretsButton} onPress={()=> navigation.navigate('Profile')} >
          <Text style={styles.secretsButtonText}>Set API_KEY & API_SECRET</Text>
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

