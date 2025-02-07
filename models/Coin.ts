import {
  CoinTapKey,
  TCoinListFilterKey,
  TOrderByKeys,
} from "@/constants/Constants";

//나중에 추가하더라도 Coin 객체 형대로 수정
export class Coin {
  id: string;
  name: string;
  price: string;

  constructor(id: string, name: string, price: string) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
export class SelectSymbol {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
export class SelectCoinTap {
  name: keyof typeof CoinTapKey;

  constructor(name: keyof typeof CoinTapKey) {
    this.name = name;
  }
}
export class CoinListFilter {
  name: TCoinListFilterKey;
  orderBy: TOrderByKeys;

  constructor(name: TCoinListFilterKey, orderBy: TOrderByKeys) {
    this.name = name;
    this.orderBy = orderBy;
  }
}
export interface Ticker24hr {
  symbol: string; // Symbol Name
  openPrice: string; // Opening price of the Interval
  priceChange: string; // Absolute price change
  priceChangePercent: string; // Relative price change in percent
  weightedAvgPrice: string; // QuoteVolume / Volume
  lastPrice: string; // Closing price of the interval
  highPrice: string; // Highest price in the interval
  lowPrice: string; // Lowest  price in the interval
  volume: string; // Total trade volume (in base asset)
  quoteVolume: string; // Total trade volume (in quote asset)
  openTime: number; // Start of the ticker interval
  closeTime: number; // End of the ticker interval
  firstId: number; // First tradeId considered
  lastId: number; // Last tradeId considered
  count: number; // Total trade count
}
export interface KLines {}
export interface AvgPrice {
  mins: number; // Average price interval (in minutes)
  price: string; // Average price
  closeTime: number; // Last trade time
}
