import ArrowDropDown from "@/assets/icon/arrow_drop.svg";
import { TCoinListFilterKey, TOrderByKeys } from "@/constants/Constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import { coinListFilterState } from "@/state/atoms";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useRecoilState } from "recoil";
const MarketListHeader = () => {
  const [coinListFilter, setCoinListFilter] =
    useRecoilState(coinListFilterState);
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const handleSelect = (
    filterKey: TCoinListFilterKey,
    orderBy: TOrderByKeys
  ) => {
    setCoinListFilter({ name: filterKey, orderBy: orderBy });
  };
  // console.log("coinListFilter", coinListFilter);
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
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            handleSelect(
              "NAME",
              coinListFilter?.name === "NAME"
                ? coinListFilter.orderBy === "ASD"
                  ? "DESC"
                  : "ASD"
                : "DESC"
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Name</Text>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={() => handleSelect("NAME", "ASD")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "NAME" &&
                  coinListFilter?.orderBy === "ASD"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect("NAME", "DESC")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "NAME" &&
                  coinListFilter?.orderBy === "DESC"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 12, color: "gray" }}>/</Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            handleSelect(
              "VOL",
              coinListFilter?.name === "VOL"
                ? coinListFilter.orderBy === "ASD"
                  ? "DESC"
                  : "ASD"
                : "DESC"
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Vol</Text>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={() => handleSelect("VOL", "ASD")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "VOL" &&
                  coinListFilter?.orderBy === "ASD"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect("VOL", "DESC")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "VOL" &&
                  coinListFilter?.orderBy === "DESC"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            handleSelect(
              "LASTPRICE",
              coinListFilter?.name === "LASTPRICE"
                ? coinListFilter.orderBy === "ASD"
                  ? "DESC"
                  : "ASD"
                : "DESC"
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Last Price</Text>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={() => handleSelect("LASTPRICE", "ASD")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "LASTPRICE" &&
                  coinListFilter?.orderBy === "ASD"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect("LASTPRICE", "DESC")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "LASTPRICE" &&
                  coinListFilter?.orderBy === "DESC"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            handleSelect(
              "CHG",
              coinListFilter?.name === "CHG"
                ? coinListFilter.orderBy === "ASD"
                  ? "DESC"
                  : "ASD"
                : "DESC"
            )
          }
        >
          <Text style={{ fontSize: 12, color: "gray" }}>24h chg%</Text>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={() => handleSelect("CHG", "ASD")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "CHG" &&
                  coinListFilter?.orderBy === "ASD"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect("CHG", "DESC")}>
              <ArrowDropDown
                width={6}
                height={6}
                fill={
                  coinListFilter?.name === "CHG" &&
                  coinListFilter?.orderBy === "DESC"
                    ? "rgb(0, 0, 0)"
                    : "rgb(205, 203, 203)"
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MarketListHeader;
