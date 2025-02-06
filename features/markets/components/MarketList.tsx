import { ThemedText } from "@/components/ThemedText";
import { Ticker24hr } from "@/models/Coin";
import { selectSymbolState } from "@/state/atoms";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSetRecoilState } from "recoil";

interface MarketListProps {
  item: Ticker24hr;
}

const MarketItem = ({ item }: MarketListProps) => {
  const setSelectSymbol = useSetRecoilState(selectSymbolState);
  const handleSelect = () => {
    setSelectSymbol({ name: item.symbol });
    router.navigate("/symbolChart");
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
      onPress={handleSelect}
    >
      <ThemedText>{item.symbol.replace("USDT", "")}</ThemedText>
      <ThemedText>/ USDT</ThemedText>
      <ThemedText>{Number(item.volume)}</ThemedText>
      <ThemedText>{Number(item.lastPrice)}</ThemedText>
      <ThemedText>{Number(item.priceChangePercent)}%</ThemedText>
    </TouchableOpacity>
  );
};

export default MarketItem;
