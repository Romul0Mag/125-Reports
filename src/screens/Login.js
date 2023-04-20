import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { commonStyles } from "../styles/styles";
import auth from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastAndroid } from "react-native";

export default function Login({ navigation, GlobalState }) {
  const { userName, setUserName } = GlobalState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-email") {
          ToastAndroid.show("Email Inválido", ToastAndroid.SHORT);
        } else if (errorCode == "auth/weak-password") {
          ToastAndroid.show("Senha Fraca", ToastAndroid.SHORT);
        } else if (errorCode == "auth/email-already-in-use") {
          ToastAndroid.show("Usuário já Cadastrado", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Erro Inesperado", ToastAndroid.SHORT);
        }
      });
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = email.split("@")[0];
        setUserName(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-email") {
          ToastAndroid.show("Email Inválido", ToastAndroid.SHORT);
        } else if (errorCode == "auth/wrong-password") {
          ToastAndroid.show("Senha Incorreta", ToastAndroid.SHORT);
        } else if (errorCode == "auth/user-not-found") {
          ToastAndroid.show("Usuário Não Encontrado", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Erro Inesperado", ToastAndroid.SHORT);
        }
      });
  };

  return (
    <ImageBackground
      source={require("../public/background.jpg")}
      style={commonStyles.backgroundImage}
    >
      <View style={styles.screen}>
        <Text style={commonStyles.title}>Bem-Vindo</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign-In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottom: {
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 36,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 16,
    width: "80%",
    borderRadius: 4,
    backgroundColor: "white",
    borderRadius: 12,
  },

  button: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
    marginBottom: 16,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});
