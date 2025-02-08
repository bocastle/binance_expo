import {
  fetchBinanceAvgPrice,
  fetchBinanceDepth,
  fetchBinanceTrades,
} from "@/api/binanceApi";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AvgPrice, Depth, Trades } from "@/models/Coin";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import TradeBuySell from "./components/TradeBuySell";
import TradeDepthList from "./components/TradeDepthList";
import TradeHeader from "./components/TradeHeader";
export default function TradeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const { data } = useQuery<AvgPrice>({
    queryKey: ["binanceAvgPrice"],
    queryFn: () => fetchBinanceAvgPrice(symbol),
    staleTime: 1000 * 60,
    structuralSharing: true,
  });
  const {
    data: depthdata,

    isStale: depthdataIsStale,
    refetch: depthdataRefetch,
  } = useQuery<Depth>({
    queryKey: ["binanceDepth"],
    queryFn: () => fetchBinanceDepth(symbol),
    staleTime: 1000 * 10,
    structuralSharing: true,
  });
  const {
    data: tradesData,

    isStale: tradesIsStale,
    refetch: tradesRefetch,
  } = useQuery<Trades[]>({
    queryKey: ["binanceTrades"],
    queryFn: () => fetchBinanceTrades(symbol),
    staleTime: 1000 * 10,
    structuralSharing: true,
  });
  const [tradeType, setTradeType] = useState<"Buy" | "Sell">("Buy");
  const [price, setPrice] = useState<number>(0);
  const handleSelect = useCallback(
    (type: "add" | "subtraction") => {
      if (type === "add") {
        setPrice((count) => count + 1);
      }
      if (type === "subtraction") {
        setPrice((count) => count - 1);
      }
    },
    [price]
  );
  const bids = useMemo(() => {
    const list = depthdata?.bids.map((key) => {
      return {
        qty: Number(key[1]).toFixed(5),
        price: Number(key[0]).toFixed(2),
      };
    });

    return list;
  }, [depthdata]);
  const asks = useMemo(() => {
    const list = depthdata?.asks.map((key) => {
      return {
        qty: Number(key[1]).toFixed(5),
        price: Number(key[0]).toFixed(2),
      };
    });

    return list;
  }, [depthdata]);
  const tradesInfo = useMemo(() => {
    const list = tradesData?.map((key) => {
      return {
        id: key.id,
        price: Number(key.price).toFixed(2),
        qty: key.qty,
        quoteQty: key.quoteQty,
        time: key.time,
        isBuyerMaker: key.isBuyerMaker,
        isBestMatch: key.isBestMatch,
      };
    });

    return list;
  }, [tradesData]);

  useEffect(() => {
    if (data) {
      let transPrice = Number(data.price).toFixed(2);
      setPrice(Number(transPrice));
    }
  }, [data]);

  useEffect(() => {
    if (tradesIsStale) {
      tradesRefetch();
    }
  }, [tradesIsStale]);
  useEffect(() => {
    if (depthdataIsStale) {
      depthdataRefetch();
    }
  }, [depthdataIsStale]);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <TradeHeader />
        <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#191919" }}>
            {symbol}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            gap: 10,
          }}
        >
          <TradeDepthList
            symbol={symbol}
            tradesInfo={tradesInfo ?? []}
            bids={bids ?? []}
            asks={asks ?? []}
            setPrice={(e) => {
              setPrice(e);
            }}
          />
          <TradeBuySell
            tradeType={tradeType}
            symbol={symbol}
            price={price}
            setTradeType={(e) => {
              setTradeType(e);
            }}
            handleSelect={(e) => {
              handleSelect(e);
            }}
            setPrice={(e) => {
              setPrice(e);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
