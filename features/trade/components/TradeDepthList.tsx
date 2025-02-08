import { Trades } from "@/models/Coin";
import { Text, TouchableOpacity, View } from "react-native";
interface TradeDepthListProps {
  symbol: string;
  tradesInfo: Trades[];
  bids: {
    qty: string;
    price: string;
  }[];
  asks: {
    qty: string;
    price: string;
  }[];
  setPrice: (e: number) => void;
}

const TradeDepthList = ({
  symbol,
  tradesInfo,
  bids,
  asks,
  setPrice,
}: TradeDepthListProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "#b8b5b5",
              fontWeight: "600",
              fontSize: 10,
            }}
          >
            Price
          </Text>
          <Text
            style={{
              color: "#b8b5b5",
              fontWeight: "600",
              fontSize: 10,
            }}
          >
            ({symbol.split("/")[1]})
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "#b8b5b5",
              fontWeight: "600",
              fontSize: 10,
            }}
          >
            Amount
          </Text>
          <Text
            style={{
              color: "#b8b5b5",
              fontWeight: "600",
              fontSize: 10,
            }}
          >
            ({symbol.split("/")[0]})
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor:
            tradesInfo && tradesInfo[0]?.isBuyerMaker
              ? "#f7afaf"
              : "transparent",
        }}
      >
        {bids &&
          bids.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{ justifyContent: "flex-start" }}
                  onPress={() => {
                    setPrice(Number(item.price));
                  }}
                >
                  <Text
                    style={{
                      color: "#da5e5e",
                      fontWeight: "600",
                      fontSize: 10,
                    }}
                  >
                    {item.price}
                  </Text>
                </TouchableOpacity>
                <View style={{ justifyContent: "flex-end" }}>
                  <Text
                    style={{
                      color: "#424141",
                      fontWeight: "600",
                      fontSize: 10,
                    }}
                  >
                    {item.qty}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
      {tradesInfo && (
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            setPrice(Number(tradesInfo[0]?.price));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: tradesInfo[0]?.isBuyerMaker ? "#b33d3d" : "#3d725a",
            }}
          >
            {tradesInfo[0]?.price}
          </Text>
          <Text>= ${tradesInfo && tradesInfo[0]?.price}</Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          backgroundColor:
            tradesInfo && !tradesInfo[0]?.isBuyerMaker
              ? "#e0edd3"
              : "transparent",
        }}
      >
        {asks?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ justifyContent: "flex-start" }}
                onPress={() => {
                  setPrice(Number(item?.price));
                }}
              >
                <Text
                  style={{
                    color: "#75c780",
                    fontWeight: "600",
                    fontSize: 10,
                  }}
                >
                  {item?.price}
                </Text>
              </TouchableOpacity>
              <View style={{ justifyContent: "flex-end" }}>
                <Text
                  style={{
                    color: "#75c780",
                    fontWeight: "600",
                    fontSize: 10,
                  }}
                >
                  {item.qty}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default TradeDepthList;
