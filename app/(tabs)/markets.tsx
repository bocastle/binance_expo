import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function TabMarketsScreen() {
  const BINANCE_API_URL = process.env.EXPO_PUBLIC_API_URL;
  // console.log("BINANCE_API_URL:::", BINANCE_API_URL);
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <Text>Tab Markets</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
