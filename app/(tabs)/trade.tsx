// import { Image, StyleSheet } from "react-native";

// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { useLocalSearchParams } from "expo-router";

// export default function TabTradeScreen() {
//   const { symbol } = useLocalSearchParams<{ symbol?: string }>();
//   console.log("symbol", symbol);
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     ></ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
import TradeScreen from "@/features/trade/TradeScreen";

export default TradeScreen;
