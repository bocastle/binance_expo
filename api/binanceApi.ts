import { Ticker24hr } from "@/models/Coin";
import { apiClient } from "./fetchConfig";

export const fetchBinanceData = async (): Promise<Ticker24hr[]> => {
  return apiClient.get<Ticker24hr[]>("/api/v3/ticker/24hr?type=FULL");
};
