import {observable, computed, action} from 'mobx';
import { AsyncStorage } from 'react-native';

export default class ApiKeysStore {
  @observable apiKey = '';
  @observable apiSecret = '';

  async saveApiKeys() {
    try{
      await AsyncStorage.setItem('@ApiKeysStore:apiKey', this.apiKey);
      await AsyncStorage.setItem('@ApiKeysStore:apiSecret', this.apiSecret);
    } catch(e) {
      console.log(e)
    }
  }

  @action setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  @action setApiSecret(apiSecret) {
    this.apiSecret = apiSecret;
  }

  @action async loadApiKeys() {
    try {
      this.apiKey = await AsyncStorage.getItem('@ApiKeysStore:apiKey');
      this.apiSecret = await AsyncStorage.getItem('@ApiKeysStore:apiSecret');
    } catch (e) {
      console.log(e);
    }
  }

  @computed get apiKeysExist() {
    return this.apiKey && this.apiSecret;
  }
}
