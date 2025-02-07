import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { selectSymbolState } from "@/state/atoms";
import { useRecoilValue } from "recoil";

export default function SymbolChartScreen() {
  const selectSymbol = useRecoilValue(selectSymbolState);

  console.log("selectSymbol", selectSymbol);
  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <IconSymbol size={24} name="arrow.backward" color={"#191919"} />
        </TouchableOpacity>
        <ThemedText type="title">{selectSymbol.name}</ThemedText>
      </View>
      <ThemedText type="title">코인 차트 대기</ThemedText>
      {/* <Link href="/" style={styles.link}> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
