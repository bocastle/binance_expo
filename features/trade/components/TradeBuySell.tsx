import ArrowDropDown from "@/assets/icon/arrow_drop.svg";
import InfoIcon from "@/assets/icon/infoIcon.svg";
import PlusIcon from "@/assets/icon/plus.svg";
import StraightLine from "@/assets/icon/straight_line.svg";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
interface TradeBuySellProps {
  tradeType: "Buy" | "Sell";
  symbol: string;
  price: number;
  setTradeType: (e: "Buy" | "Sell") => void;
  handleSelect: (e: "add" | "subtraction") => void;
  setPrice: (e: number) => void;
}

const TradeBuySell = ({
  tradeType,
  symbol,
  price,
  setTradeType,
  handleSelect,
  setPrice,
}: TradeBuySellProps) => {
  return (
    <View style={{ flex: 2, gap: 4 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#dddfdd",
          height: 30,
        }}
      >
        <TouchableOpacity
          style={
            tradeType === "Buy"
              ? {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#22a222",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  borderColor: "transparent",
                }
              : {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }
          }
          onPress={() => {
            setTradeType("Buy");
          }}
        >
          <Text
            style={{
              color: tradeType === "Buy" ? "#FFF" : "gray",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            tradeType === "Sell"
              ? {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fc7a71",
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderColor: "transparent",
                }
              : {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }
          }
          onPress={() => {
            setTradeType("Sell");
          }}
        >
          <Text
            style={{
              color: tradeType === "Sell" ? "#FFF" : "gray",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            Sell
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 5,
          height: 30,
          backgroundColor: "#aba9a9",
          paddingHorizontal: 10,
        }}
      >
        <InfoIcon width={15} height={15} fill={"rgb(62, 60, 60)"} />
        <Text
          style={{
            color: "#191919",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          Limit
        </Text>
        <ArrowDropDown width={10} height={10} fill={"rgb(62, 60, 60)"} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 5,
          height: 30,
          backgroundColor: "#aba9a9",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleSelect("subtraction");
          }}
        >
          <StraightLine width={15} height={15} fill={"rgb(62, 60, 60)"} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#d8d5d5",
              fontWeight: "600",
              fontSize: 10,
            }}
          >
            Price({symbol?.split("/")[1]})
          </Text>
          <TextInput
            keyboardType="numeric"
            style={{
              color: "#191919",
              fontWeight: "600",
              fontSize: 14,
            }}
            onChangeText={(item) => {
              const regExp = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
              let isMatch = !regExp.test(item);

              if (isMatch) {
                setPrice(Number(item));
              }
            }}
            defaultValue={String(price)}
            value={String(price)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSelect("add");
          }}
        >
          <PlusIcon width={15} height={15} fill={"rgb(62, 60, 60)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TradeBuySell;
