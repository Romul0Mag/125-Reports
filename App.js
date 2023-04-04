import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import registerNNPushToken from "native-notify";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import ChosenTask from "./src/screens/ChosenTask";

const Stack = createNativeStackNavigator();

export default function App() {
  let x = 1;
  console.log("App executed");
  //push notifications
  registerNNPushToken(6912, "W8ZP8CWIwm3ebc0VTfJLwk");

  //globalstate management
  const [toDoList, setToDoList] = useState([{ id: 1, task: "go to bed" }]);
  const [task, setTask] = useState("");
  const [chosenTask, setChosenTask] = useState({});

  const GlobalState = {
    toDoList,
    setToDoList,
    task,
    setTask,
    chosenTask,
    setChosenTask,
  };

  //navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="ChosenTask" options={{ headerShown: false }}>
          {(props) => <ChosenTask {...props} GlobalState={GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
