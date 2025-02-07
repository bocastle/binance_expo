import { Ticker24hr } from "@/models/Coin";
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
