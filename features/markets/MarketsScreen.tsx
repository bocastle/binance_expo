import { fetchBinanceData } from "@/api/binanceApi";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ticker24hr } from "@/models/Coin";
import { coinListFilterState } from "@/state/atoms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import { useRecoilValue } from "recoil";
import CoinTapHeader from "./components/CoinTapHeader";
import MarketItem from "./components/MarketList";
import MarketListHeader from "./components/MarketListHeader";

export default function MarketsScreen() {
  const coinListFilter = useRecoilValue(coinListFilterState);
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
        switch (coinListFilter?.name) {
          case "NAME":
            if (coinListFilter.orderBy === "ASD") {
              return a.symbol > b.symbol ? 1 : -1;
            } else {
              return a.symbol < b.symbol ? 1 : -1;
            }
          case "VOL":
            if (coinListFilter.orderBy === "ASD") {
              return Number(a.quoteVolume) - Number(b.quoteVolume);
            } else {
              return Number(b.quoteVolume) - Number(a.quoteVolume);
            }
          case "LASTPRICE":
            if (coinListFilter.orderBy === "ASD") {
              return Number(a.lastPrice) - Number(b.lastPrice);
            } else {
              return Number(b.lastPrice) - Number(a.lastPrice);
            }
          case "CHG":
            if (coinListFilter.orderBy === "ASD") {
              return (
                Number(a.priceChangePercent) - Number(b.priceChangePercent)
              );
            } else {
              return (
                Number(b.priceChangePercent) - Number(a.priceChangePercent)
              );
            }

          default:
            return Number(b.quoteVolume) - Number(a.quoteVolume);
        }
      })
      .reduce((acc, curr) => {
        if (curr.symbol.endsWith("USDT") && Number(curr.quoteVolume) !== 0) {
          acc.push(curr);
        }
        return acc;
      }, [] as Ticker24hr[]);

    return array;
  }, [data, coinListFilter]);

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

  // console.log("data", data);
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <ThemedText>Search Coin Paris</ThemedText>
        <CoinTapHeader />
        <MarketListHeader />
        {Ticker24hrArray && (
          <FlatList
            data={Ticker24hrArray}
            renderItem={({ item }) => <MarketItem item={item} />}
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
