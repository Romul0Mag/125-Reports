import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function Home({ navigation, GlobalState }) {
  const { toDoList, setToDoList, task, setTask, setChosenTask } = GlobalState;

  useEffect(() => {
    setToDoList((prevState) => [...prevState, { id: 2, task: "lala" }]);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.task}
        onPress={() => handleChooseTask(item)}
      >
        <Text>{item.task}</Text>
      </TouchableOpacity>
    );
  };

  const handleSaveTask = () => {
    const id = toDoList.length + 1;

    setToDoList((prevState) => [...prevState, { id: id, task: task }]);
    setTask("");
  };

  const handleChooseTask = (e) => {
    setChosenTask(e);
    navigation.navigate("ChosenTask");
  };

  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.body}>
        <TextInput
          style={commonStyles.input}
          onChangeText={setTask}
          value={task}
          placeholder="To do Task..."
        />
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => handleSaveTask()}
        >
          <Text style={commonStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <FlatList
          data={toDoList}
          renderItem={renderItem}
          keyExtractor={(item, zIndex) => zIndex}
        />
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
