import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState({});

  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (event) => setText(event);
  const addToDo = () => {
    if (text === "") return;
    const newTodo = Object.assign({}, toDo, {
      [Date.now()]: { text, work: working },
    });
    setToDo(newTodo);
    console.log(newTodo);
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.color : theme.colorGray,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.colorGray : theme.color,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        value={text}
        onChangeText={onChangeText}
        returnKeyType="done"
        placeholder={working ? "Add a To Do" : "Where do you wnat to go?"}
        placeholderTextColor="#707070"
        style={styles.input}
      />
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
    fontSize: theme.tabFontSize,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 20,
  },
});
