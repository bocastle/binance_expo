import { fetchBinanceData } from "@/api/binanceApi";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ticker24hr } from "@/models/Coin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

export default function TabMarketsScreen() {
  const queryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, isStale, refetch } = useQuery<Ticker24hr[]>({
    queryKey: ["binanceData"],
    queryFn: fetchBinanceData,
    staleTime: 1000 * 50,
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
        backgroundColor: backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <ThemedText>심볼명</ThemedText>
      <ThemedText>가격 (USDT)</ThemedText>
    </View>
  );

  const renderItem = (item: Ticker24hr) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: backgroundColor,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <ThemedText>{item.symbol}</ThemedText>
        <ThemedText>{item.lastPrice}</ThemedText>
      </View>
    );
  };

  // console.log("data", data);
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <ThemedText>Tab Markets</ThemedText>
        {renderHeader()}
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem(item)}
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
