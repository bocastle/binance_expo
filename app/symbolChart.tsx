import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { selectSymbolState } from "@/state/atoms";
import { useRecoilValue } from "recoil";

export default function SymbolChartScreen() {
  const selectSymbol = useRecoilValue(selectSymbolState);

  console.log("selectSymbol", selectSymbol);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">코인 차트 대기</ThemedText>
      {/* <Link href="/" style={styles.link}> */}
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <ThemedText type="link">이전 페이지</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
