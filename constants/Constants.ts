export type TCoinListFilterKey = "NAME" | "VOL" | "LASTPRICE" | "CHG";
export type TOrderByKeys = "ASD" | "DESC";

export const CoinTapKey = {
  USDT: "USDT" as const,
  FDUSD: "FDUSD" as const,
  USDC: "USDC" as const,
  TUSD: "TUSD" as const,
  BNB: "BNB" as const,
  BTC: "BTC" as const,
  ALTS: "ALTS" as const,
};
export const TradeTapKey = {
  CONVERT: "Convert" as const,
  SPOT: "Spot" as const,
  MARGIN: "Margin" as const,
  BUYSELL: "Buy/Sell" as const,
};
