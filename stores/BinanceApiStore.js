import {observable, computed, action, createTransformer} from 'mobx';
import hmacSHA256 from 'crypto-js/hmac-sha256';

const SATOSHI = 0.00000001;

export default class BinanceApiStore {
  constructor(apiKeysStore){
    this.apiKeysStore = apiKeysStore;
  }

  @observable apiKeysStore;
  @observable balances;
  @observable tickers;

  @computed get tickersMap() {
    return this.tickers.reduce((acc, item) => {
      acc[item.symbol] = (Number(item.askPrice) + Number(item.bidPrice))/2
      return acc
    }
    ,{})
  }

  symbolPriceInBtc(symbol, amount) {
    if(symbol == 'BTC'){return amount}
    const priceInBtc =  this.tickersMap[`${symbol}BTC`] || 1 / (this.tickersMap[`BTC${symbol}`])
    return (priceInBtc * amount).toFixed(8)
  }

  btcPriceInUsdt(amount) {
    return (amount * this.tickersMap[`BTCUSDT`]).toFixed(2)
  }

  @computed get computedBalances() {
    if(!this.balances || !this.tickers){return}
    const that = this
    console.log(this.tickersMap)
    return this.balances && this.balances
    // TODO: Remake to reducers/transducers
      .filter(item => Number(item.free) > 0)
      .map(item => {
        item.btcPrice = that.symbolPriceInBtc(item.asset, Number(item.free));
        item.usdPrice = that.btcPriceInUsdt(item.btcPrice);
        return item
      })
  }

  @action async loadBookTickers() {
    const data = await fetch('https://api.binance.com/api/v3/ticker/bookTicker')
      .then(res => res.json())
      .catch(err => console.log(err))
    if(data.msg){
      throw data.msg;
    }
    this.tickers = data;
  }

  @action async loadAccountData() {
    const timestamp = Date.now()
    const signature = hmacSHA256('timestamp='+timestamp, this.apiKeysStore.apiSecret)
    const myHeaders = {'X-MBX-APIKEY': this.apiKeysStore.apiKey}
    const data = await fetch(
      `https://api.binance.com/api/v3/account?timestamp=${timestamp}&signature=${signature}`,
      {headers: myHeaders}
    )
      .then(res => res.json())
      .catch(err => console.log(err))

    console.log(JSON.stringify(data))

    if(data.code == -2014) { // TODO: magic number!
      throw data.msg
    } else {
      this.balances = data.balances;
    }
  }
}
