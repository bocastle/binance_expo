import Search from "@/assets/icon/search.svg";
import ThreeDots from "@/assets/icon/three_dots.svg";
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
        alignItems: "center",
        gap: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 5,
          borderRadius: 5,
          backgroundColor: "#cccacae9",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Search width={20} height={20} />
        <Text style={{ fontSize: 12, color: "gray" }}>Search Coin Paris</Text>
      </View>
      <View>
        <ThreeDots width={15} height={15} />
      </View>
    </View>
  );
};
export default SearchCoinPairs;
