import { ThemedText } from "@/components/ThemedText";
import { Ticker24hr } from "@/models/Coin";
import React from "react";
import { TouchableOpacity } from "react-native";

const MarketItem = (item: Ticker24hr) => {
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
      onPress={() => {
        console.log("item", item);
      }}
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
