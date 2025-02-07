import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ArrowBack from "@/assets/icon/arrow_back.svg";
import { ThemedView } from "@/components/ThemedView";
import { selectCoinTapState, selectSymbolState } from "@/state/atoms";

import { fetchBinanceChartData } from "@/api/binanceApi";
import { useQuery } from "@tanstack/react-query";
import { LineChart } from "react-native-gifted-charts";
import { useRecoilValue } from "recoil";

export default function SymbolChartScreen() {
  const selectSymbol = useRecoilValue(selectSymbolState);
  const selectCoinTap = useRecoilValue(selectCoinTapState);

  // console.log("selectSymbol", selectSymbol);
  const { data, isLoading, error, isStale, refetch } = useQuery<any>({
    queryKey: ["binanceklinesData"],
    queryFn: () => fetchBinanceChartData(selectSymbol.name),
    staleTime: 1000 * 60,
    structuralSharing: true,
  });
  const chartData = useMemo(() => {
    const formattedData = data?.map((item: any, index: number) => ({
      value: parseFloat(item[4]),
      label: index % 5 === 0 ? new Date(item[6]).toLocaleTimeString() : "",
    }));
    return formattedData;
  }, [data]);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

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
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <View>
            <Text style={{ fontSize: 16, color: "#191919", fontWeight: "600" }}>
              {selectSymbol.name.replace(selectCoinTap.name, "")}
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
      </View>
      <View style={{ padding: 20 }}>
        <LineChart
          data={chartData}
          width={500}
          height={200}
          color={"#37337c"} // 녹색 상승 차트
          textColor={"#000"}
          thickness={2} // 선 두께
          hideRules={true} // 가이드라인 표시
          hideDataPoints={true} // 데이터 포인트 숨기지 않음
          spacing={10} // 데이터 간격
        />
      </View>
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
