import { AvgPrice, Depth, Ticker24hr, Trades } from "@/models/Coin";
import { apiClient } from "./fetchConfig";

export const fetchBinanceData = async (): Promise<Ticker24hr[]> => {
  return apiClient.get<Ticker24hr[]>("/api/v3/ticker/24hr?type=FULL");
};

export const fetchBinanceChartData = async (
  searchQuery: string
): Promise<any> => {
  return apiClient.get<any>(
    `/api/v3/klines?symbol=${searchQuery}&interval=1h&limit=30`
  );
};
export const fetchBinanceAvgPrice = async (
  searchQuery: string
): Promise<AvgPrice> => {
  return apiClient.get<AvgPrice>(
    `/api/v3/avgPrice?symbol=${searchQuery.replace("/", "")}`
  );
};
export const fetchBinanceDepth = async (
  searchQuery: string
): Promise<Depth> => {
  return apiClient.get<Depth>(
    `/api/v3/depth?symbol=${searchQuery.replace("/", "")}&limit=7`
  );
};
export const fetchBinanceTrades = async (
  searchQuery: string
): Promise<Trades[]> => {
  return apiClient.get<Trades[]>(
    `/api/v3/trades?symbol=${searchQuery.replace("/", "")}&limit=1`
  );
};
