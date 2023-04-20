import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function Home({ navigation }) {
  const handleCreateReport = () => {
    navigation.navigate("CreateReport");
  };

  const handleViewReports = () => {
    navigation.navigate("ViewReports");
  };

  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.body}>
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => handleCreateReport()}
        >
          <Text style={commonStyles.buttonText}>Criar relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => handleViewReports()}
        >
          <Text style={commonStyles.buttonText}>Visualizar relatórios</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}
