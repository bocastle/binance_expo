import BurgerLine from "@/assets/icon/burger_line.svg";
import { TradeTapKey } from "@/constants/Constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCallback, useMemo } from "react";
import { Text, useColorScheme, View } from "react-native";
const TradeHeader = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );

  const TradeTapList = useMemo(() => {
    const list = Object.keys(TradeTapKey).map((key) => {
      const _key = key as keyof typeof TradeTapKey;
      return { value: _key, label: TradeTapKey[_key] };
    });

    return list;
  }, []);

  const RenderItem = useCallback(() => {
    return TradeTapList.map((item, index) => {
      if (item.value === "SPOT") {
        return (
          <View key={index}>
            <Text style={{ fontSize: 17, color: "#191919", fontWeight: "600" }}>
              {item.label}
            </Text>
          </View>
        );
      } else {
        return (
          <View key={index}>
            <Text style={{ fontSize: 17, color: "gray", fontWeight: "600" }}>
              {item.label}
            </Text>
          </View>
        );
      }
    });
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: backgroundColor,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <RenderItem />
        </View>
        <View>
          <BurgerLine width={20} height={20} />
        </View>
      </View>
    </View>
  );
};
export default TradeHeader;
