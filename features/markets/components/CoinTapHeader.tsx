import { CoinTapKey } from "@/constants/Constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import { selectCoinTapState } from "@/state/atoms";
import { useMemo } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useRecoilState } from "recoil";
const CoinTapHeader = () => {
  const [selectCoinTap, setSelectCoinTap] = useRecoilState(selectCoinTapState);
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const handleSelect = (item: keyof typeof CoinTapKey) => {
    console.log(item);
    setSelectCoinTap({ name: item });
  };

  // 탭 리스트
  const coinTapList = useMemo(() => {
    const list = Object.keys(CoinTapKey).map((key) => {
      const _key = key as keyof typeof CoinTapKey;
      return { value: _key, label: CoinTapKey[_key] };
    });

    return list;
  }, []);
  console.log("coinTapList", coinTapList);
  console.log("selectCoinTap", selectCoinTap);
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
      {coinTapList.map((item, index) => {
        if (selectCoinTap?.name === item.value) {
          return (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: "row", gap: 3 }}
              onPress={() => handleSelect(item.value)}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#191919",
                  fontWeight: "600",
                  backgroundColor: "#cccaca",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: "row", gap: 3, padding: 5 }}
              onPress={() => handleSelect(item.value)}
            >
              <Text style={{ fontSize: 12, color: "gray" }}>{item.label}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};
export default CoinTapHeader;
