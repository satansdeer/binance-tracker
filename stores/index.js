import ApiKeysStore from './ApiKeysStore';
import BinanceApiStore from './BinanceApiStore';

const apiKeysStore = new ApiKeysStore()
const binanceApiStore = new BinanceApiStore(apiKeysStore)

export default {
  apiKeysStore: apiKeysStore,
  binanceApiStore: binanceApiStore,
};
