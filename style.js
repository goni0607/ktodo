import { StyleSheet } from "react-native";
import { theme } from "./colors";

export const styles = StyleSheet.create({
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
  inputToDo: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  toDoList: {
    marginTop: 20,
  },
  toDo: {
    flexDirection: "column",
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
  toDoTextDone: {
    color: theme.done,
    fontSize: 18,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  toDoButton: {
    backgroundColor: "white",
  },
});
