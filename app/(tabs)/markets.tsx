import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

interface ResponseValue {
  symbol: string; // Symbol Name
  openPrice: string; // Opening price of the Interval
  highPrice: string; // Highest price in the interval
  lowPrice: string; // Lowest  price in the interval
  lastPrice: string; // Closing price of the interval
  volume: string; // Total trade volume (in base asset)
  quoteVolume: string; // Total trade volume (in quote asset)
  openTime: number; // Start of the ticker interval
  closeTime: number; // End of the ticker interval
  firstId: number; // First tradeId considered
  lastId: number; // Last tradeId considered
  count: number; // Total trade count
}

const fetchBinanceData = async () => {
  const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/v3/ticker/24hr?type=MINI`;
  const res = await fetch(apiUrl);

  return res.json();
};
export default function TabMarketsScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );

  const { data, isLoading, error, isStale, refetch } = useQuery<
    ResponseValue[]
  >({
    queryKey: ["binanceTicker"],
    queryFn: async () => fetchBinanceData(),
    staleTime: 1000 * 10,
    structuralSharing: true,
  });

  useEffect(() => {
    if (isStale) {
      refetch();
    }
  }, [isStale]);

  if (isLoading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <ThemedText>Tab Markets</ThemedText>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ThemedText>
              {item.symbol}: {item.lastPrice}
            </ThemedText>
          )}
          keyExtractor={(item) => item.symbol}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
