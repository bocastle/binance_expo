import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function TradeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: colorScheme ?? undefined, dark: colorScheme ?? undefined },
    "background"
  );
  const { symbol } = useLocalSearchParams<{ symbol?: string }>();
  console.log("symbol", symbol);
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1 }}>
        <Text>123</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
