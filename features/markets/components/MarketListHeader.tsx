import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme, View } from "react-native";

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
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <ThemedText>name</ThemedText>
      <ThemedText>Vol</ThemedText>
      <ThemedText>Last Price</ThemedText>
      <ThemedText>24h chg%</ThemedText>
    </View>
  );
};
export default MarketListHeader;
