import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { commonStyles } from "../styles/styles";
import auth from '../config/firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { ToastAndroid } from 'react-native';

export default function Login({ navigation, GlobalState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    ToastAndroid.show(errorCode, ToastAndroid.SHORT);
  });
  }
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    navigation.navigate("Home");
  })
  .catch((error) => {
    const errorCode = error.code;
    ToastAndroid.show(errorCode, ToastAndroid.SHORT);
  });
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
        <Text style={commonStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={commonStyles.button} onPress={handleSignUp}>
        <Text style={commonStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 16,
    width: "80%",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    margin: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
