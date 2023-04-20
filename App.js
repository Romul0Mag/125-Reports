import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import registerNNPushToken from "native-notify";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import CreateReport from "./src/screens/CreateReport";
import ViewReports from "./src/screens/ViewReports";
import Settings from "./src/screens/CreateReport";
import UploadCloud from "./src/screens/ViewReports";

const Stack = createNativeStackNavigator();

export default function App() {
  //push notifications
  registerNNPushToken(6912, "W8ZP8CWIwm3ebc0VTfJLwk");

  //globalstate management
  const [userName, setUserName] = useState("");

  const GlobalState = {
    userName,
    setUserName,
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

        <Stack.Screen name="CreateReport" options={{ headerShown: false }}>
          {(props) => <CreateReport {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="ViewReports" options={{ headerShown: false }}>
          {(props) => <ViewReports {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="Settings" options={{ headerShown: false }}>
          {(props) => <Settings {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

        <Stack.Screen name="UploadCloud" options={{ headerShown: false }}>
          {(props) => <UploadCloud {...props} GlobalState={GlobalState} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
