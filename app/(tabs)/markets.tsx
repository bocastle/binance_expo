import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const [refreshing, setRefreshing] = useState(false);
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

  // 새로고침 기능
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["binanceData"] });
      setRefreshing(false);
    }, 1000);
  };
  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <ThemedText>심볼명</ThemedText>
      <ThemedText>가격 (USDT)</ThemedText>
    </View>
  );

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <ThemedText>Tab Markets</ThemedText>
        {renderHeader()}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: "#f8f9fa",
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            >
              <ThemedText>{item.symbol}</ThemedText>
              <ThemedText>{item.lastPrice}</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={{ paddingTop: 0 }}
          onRefresh={handleRefresh}
          refreshing={refreshing}
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
