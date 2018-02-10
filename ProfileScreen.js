import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react'

@inject('apiKeysStore')
@observer
export default class ProfileScreen extends React.Component {
  async updateKeys() {
    try{
      await this.props.apiKeysStore.saveApiKeys()
      this.props.navigation.navigate('Home')
    } catch(e){
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(apiKey) => this.props.apiKeysStore.setApiKey(apiKey)}
          value={this.props.apiKeysStore.apiKey}
          placeholder='API_KEY'
        />
        <TextInput
          style={styles.input}
          onChangeText={(apiSecret) => this.props.apiKeysStore.setApiSecret(apiSecret)}
          value={this.props.apiKeysStore.apiSecret}
          placeholder='API_SECRET'
          placeholderTextColor='#DDBC44'
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={this.updateKeys.bind(this)}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272C36',
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  input: {
    borderColor: '#DDBC44',
    borderWidth: 1,
    height: 40,
    marginBottom: 15,
    padding: 10,
    color: '#DDBC44',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  button: {
    borderWidth: 1,
    borderColor: '#DDBC44',
    padding: 8,
    marginTop: 15,
    width: 150
  },
  buttonText: {
    color: '#DDBC44',
    textAlign: 'center',
  }
});


