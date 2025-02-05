import { fetchBinanceData } from "@/api/binanceApi";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ticker24hr } from "@/models/Coin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
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

  const Ticker24hrArray = useMemo(() => {
    // console.log("data", data);
    if (data === undefined) return;
    let array: Ticker24hr[] = data
      .sort((a, b) => {
        // return Number(a.quoteVolume) - Number(b.quoteVolume);
        return Number(b.quoteVolume) - Number(a.quoteVolume);
      })
      .reduce((acc, curr) => {
        if (curr.symbol.endsWith("USDT") && Number(curr.quoteVolume) !== 0) {
          acc.push(curr);
        }
        return acc;
      }, [] as Ticker24hr[]);

    return array;
  }, [data]);

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
      <ThemedText>name</ThemedText>
      <ThemedText>Vol</ThemedText>
      <ThemedText>Last Price</ThemedText>
      <ThemedText>24h chg%</ThemedText>
    </View>
  );

  const renderItem = (item: Ticker24hr) => {
    // console.log("item", item);

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
        <ThemedText>{item.symbol.replace("USDT", "")}</ThemedText>
        <ThemedText>/ USDT</ThemedText>
        <ThemedText>{Number(item.volume)}</ThemedText>
        <ThemedText>{Number(item.lastPrice)}</ThemedText>
        <ThemedText>{Number(item.priceChangePercent)}%</ThemedText>
      </View>
    );
  };

  // console.log("data", data);
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <ThemedText>Search Coin Paris</ThemedText>

        {renderHeader()}
        {Ticker24hrArray && (
          <FlatList
            data={Ticker24hrArray}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.symbol}
            contentContainerStyle={{ paddingTop: 0, paddingBottom: 50 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
