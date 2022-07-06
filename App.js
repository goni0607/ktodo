import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState({});

  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (event) => setText(event);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (toDos) => {
    try {
      const jv = JSON.stringify(toDos);
      await AsyncStorage.setItem("@todos", jv);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jv = await AsyncStorage.getItem("@todos");
      setToDo(jv != null ? JSON.parse(jv) : {});
    } catch (e) {
      console.log(e);
    }
  };

  const addToDo = () => {
    if (text === "") return;
    // const newTodo = Object.assign({}, toDo, {
    //   [Date.now()]: { text, work: working },
    // });
    const newTodo = { ...toDo, [Date.now()]: { text, work: working } };
    setToDo(newTodo);
    storeData(newTodo);
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
      <ScrollView style={styles.toDoList} horizontal={false}>
        {Object.keys(toDo)
          .filter((key) => toDo[key].work === working)
          .map((key) => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDo[key].text}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: "2%",
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
  toDoList: {
    marginTop: 20,
  },
  toDo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 10,
  },
  toDoText: {
    color: theme.color,
    fontSize: 18,
  },
});
