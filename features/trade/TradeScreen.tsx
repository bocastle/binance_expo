import { fetchBinanceAvgPrice } from "@/api/binanceApi";
import ArrowDropDown from "@/assets/icon/arrow_drop.svg";
import InfoIcon from "@/assets/icon/infoIcon.svg";
import PlusIcon from "@/assets/icon/plus.svg";
import StraightLine from "@/assets/icon/straight_line.svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AvgPrice } from "@/models/Coin";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import TradeHeader from "./components/TradeHeader";
export default function TradeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const { data, isLoading, error, isStale, refetch } = useQuery<AvgPrice>({
    queryKey: ["binanceAvgPrice"],
    queryFn: () => fetchBinanceAvgPrice(symbol),
    staleTime: 1000 * 60,
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

  useEffect(() => {
    if (data) {
      let transPrice = Number(data.price).toFixed(2);
      setPrice(Number(transPrice));
    }
  }, [data]);
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
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>1</Text>
          </View>
          <View style={{ flex: 2, gap: 4 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#dddfdd",
                height: 30,
              }}
            >
              <TouchableOpacity
                style={
                  tradeType === "Buy"
                    ? {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#22a222",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        borderColor: "transparent",
                      }
                    : {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }
                }
                onPress={() => {
                  setTradeType("Buy");
                }}
              >
                <Text
                  style={{
                    color: tradeType === "Buy" ? "#FFF" : "gray",
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  tradeType === "Sell"
                    ? {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fc7a71",
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        borderColor: "transparent",
                      }
                    : {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }
                }
                onPress={() => {
                  setTradeType("Sell");
                }}
              >
                <Text
                  style={{
                    color: tradeType === "Sell" ? "#FFF" : "gray",
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Sell
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 5,
                height: 30,
                backgroundColor: "#aba9a9",
                paddingHorizontal: 10,
              }}
            >
              <InfoIcon width={15} height={15} fill={"rgb(62, 60, 60)"} />
              <Text
                style={{
                  color: "#191919",
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                Limit
              </Text>
              <ArrowDropDown width={10} height={10} fill={"rgb(62, 60, 60)"} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 5,
                height: 30,
                backgroundColor: "#aba9a9",
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleSelect("subtraction");
                }}
              >
                <StraightLine width={15} height={15} fill={"rgb(62, 60, 60)"} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#d8d5d5",
                    fontWeight: "600",
                    fontSize: 10,
                  }}
                >
                  Price({symbol?.split("/")[1]})
                </Text>
                <TextInput
                  style={{
                    color: "#191919",
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                  value={String(price)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSelect("add");
                }}
              >
                <PlusIcon width={15} height={15} fill={"rgb(62, 60, 60)"} />
              </TouchableOpacity>
            </View>
          </View>
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
