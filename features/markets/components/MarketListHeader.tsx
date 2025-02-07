import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, useColorScheme, View } from "react-native";

const MarketListHeader = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <View style={{ flexDirection: "row", gap: 3 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>Name</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: "gray" }}>/</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>Vol</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View>
          <Text style={{ fontSize: 12, color: "gray" }}>Last Price</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: "gray" }}>24h chg%</Text>
        </View>
      </View>
    </View>
  );
};
export default MarketListHeader;
