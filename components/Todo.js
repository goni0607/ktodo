import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { styles } from "../style";
import { theme } from "../colors";
import { useState } from "react";

export default function Todo({
  id,
  text,
  done,
  updateToDo,
  deleteToDo,
  doneToDo,
}) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const toggleEditMode = (state) => setEdit(state);
  const onChangeText = (event) => {
    setEditValue(event);
  };
  const onSubmitEditing = () => {
    updateToDo(id, editValue);
    setEdit(false);
  };

  return (
    <View style={styles.toDo}>
      {edit ? (
        <>
          <TextInput
            style={styles.inputToDo}
            returnKeyType="done"
            value={editValue}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button title="Update" onPress={onSubmitEditing} />
            <Button
              style={styles.toDoButton}
              title="Delete"
              color="red"
              onPress={() => deleteToDo(id)}
            />
            <Button
              title="Cancel"
              color="red"
              onPress={() => toggleEditMode(false)}
            />
          </View>
        </>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onLongPress={() => toggleEditMode(true)}
            onPress={() => doneToDo(id, done)}
          >
            <Text style={done ? styles.toDoTextDone : styles.toDoText}>
              {text}
            </Text>
          </TouchableOpacity>
          {done && <Fontisto name="check" size={22} color="green" />}
        </View>
      )}
    </View>
  );
}
