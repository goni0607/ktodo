import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "./components/Todo";
import { styles } from "./style";

export default function App() {
  const KEY_TODO = "@todos";
  const KEY_WORK = "@work";
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDo, setToDo] = useState({});

  const work = (state) => {
    setWorking(state);
    storeData(KEY_WORK, state.toString(), false);
  };
  const onChangeText = (event) => setText(event);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (key, data, isObject = true) => {
    try {
      const sd = isObject ? JSON.stringify(data) : data;
      await AsyncStorage.setItem(key, sd);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const t = await AsyncStorage.getItem(KEY_TODO);
      setToDo(t != null ? JSON.parse(t) : {});
      const w = await AsyncStorage.getItem(KEY_WORK);
      setWorking(w != null ? w === "true" : true);
    } catch (e) {
      console.log(e);
    }
  };

  const addToDo = () => {
    if (text === "") return;
    // const newTodo = Object.assign({}, toDo, {
    //   [Date.now()]: { text, work: working },
    // });
    const newTodo = {
      ...toDo,
      [Date.now()]: { text, work: working, done: false },
    };
    setToDo(newTodo);
    storeData(KEY_TODO, newTodo);
    setText("");
  };

  const deleteData = (key) => {
    const newTodo = { ...toDo };
    delete newTodo[key];
    setToDo(newTodo);
    storeData(KEY_TODO, newTodo);
  };

  const deleteToDo = (key) => {
    Alert.alert("Remove to do", "Are you delete this to do?", [
      { text: "Cencel" },
      {
        text: "OK",
        onPress: () => {
          deleteData(key);
        },
      },
    ]);
  };

  const updateToDo = (key, text) => {
    const newTodo = { ...toDo, [key]: { text, work: working } };
    setToDo(newTodo);
    storeData(KEY_TODO, newTodo);
  };

  const doneToDo = (key, done) => {
    const newTodo = { ...toDo };
    newTodo[key].done = !done;
    setToDo(newTodo);
    storeData(KEY_TODO, newTodo);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => work(true)}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.color : theme.colorGray,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => work(false)}>
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
            <Todo
              key={key}
              id={key}
              text={toDo[key].text}
              done={toDo[key].done}
              updateToDo={updateToDo}
              deleteToDo={deleteToDo}
              doneToDo={doneToDo}
            />
          ))}
      </ScrollView>
    </View>
  );
}
