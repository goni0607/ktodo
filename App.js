import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 10,
  },
  header: {
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    color: theme.color,
    fontSize: theme.tabFontSize,
    fontWeight: "600",
  },
});
