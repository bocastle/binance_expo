import ArrowDropDown from "@/assets/icon/arrow_drop.svg";
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>Name</Text>
          <View style={{ flexDirection: "column" }}>
            <View>
              <ArrowDropDown
                width={6}
                height={6}
                fill={"rgb(205, 203, 203)"}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </View>
            <View>
              <ArrowDropDown width={6} height={6} fill={"rgb(205, 203, 203)"} />
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: "gray" }}>/</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>Vol</Text>
          <View style={{ flexDirection: "column" }}>
            <View>
              <ArrowDropDown
                width={6}
                height={6}
                fill={"rgb(205, 203, 203)"}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </View>
            <View>
              <ArrowDropDown width={6} height={6} fill={"rgb(205, 203, 203)"} />
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>Last Price</Text>
          <View style={{ flexDirection: "column" }}>
            <View>
              <ArrowDropDown
                width={6}
                height={6}
                fill={"rgb(205, 203, 203)"}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </View>
            <View>
              <ArrowDropDown width={6} height={6} fill={"rgb(205, 203, 203)"} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>24h chg%</Text>
          <View style={{ flexDirection: "column" }}>
            <View>
              <ArrowDropDown
                width={6}
                height={6}
                fill={"rgb(205, 203, 203)"}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </View>
            <View>
              <ArrowDropDown width={6} height={6} fill={"rgb(205, 203, 203)"} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default MarketListHeader;
