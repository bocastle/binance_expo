import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, useColorScheme, View } from "react-native";

const SearchCoinPairs = () => {
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
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 5,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "#191a1999",
        }}
      >
        <Text style={{ fontSize: 12, color: "gray" }}>Search Coin Paris</Text>
      </View>
    </View>
  );
};
export default SearchCoinPairs;
