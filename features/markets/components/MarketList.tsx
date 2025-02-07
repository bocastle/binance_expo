import { Ticker24hr } from "@/models/Coin";
import { selectCoinTapState, selectSymbolState } from "@/state/atoms";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useRecoilValue, useSetRecoilState } from "recoil";

interface MarketListProps {
  item: Ticker24hr;
}

const MarketItem = ({ item }: MarketListProps) => {
  const selectCoinTap = useRecoilValue(selectCoinTapState);
  const setSelectSymbol = useSetRecoilState(selectSymbolState);
  const handleSelect = () => {
    // console.log("item", item);
    setSelectSymbol({ name: item.symbol });
    router.navigate("/symbolChart");
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
      onPress={handleSelect}
    >
      <View style={{ flexDirection: "column", gap: 2 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <View>
            <Text style={{ fontSize: 16, color: "#191919", fontWeight: "600" }}>
              {item.symbol.replace(selectCoinTap.name, "")}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, color: "gray" }}>/</Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, color: "gray" }}>
              {selectCoinTap.name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>
            {Number(item.volume)}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, color: "#191919", fontWeight: "600" }}>
              {Number(item.lastPrice)}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 11, color: "gray" }}>
              ${Number(item.lastPrice)}
            </Text>
          </View>
        </View>
        {Math.sign(Number(item.priceChangePercent)) === 1 ? (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#56bf84",
              padding: 5,
              borderRadius: 5,
              width: 90,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "600" }}>
              +{Number(item.priceChangePercent).toFixed(2)}%
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ed4a4a",
              padding: 5,
              borderRadius: 5,
              width: 90,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "600" }}>
              {Number(item.priceChangePercent).toFixed(2)}%
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MarketItem;
