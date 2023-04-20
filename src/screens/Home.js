import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Icon from "react-native-vector-icons/AntDesign";

import { commonStyles } from "../styles/styles";

export default function Home({ navigation }) {
  const handleCreateReport = () => {
    navigation.navigate("CreateReport");
  };

  const handleViewReports = () => {
    navigation.navigate("ViewReports");
  };

  const handleConfigurations = () => {
    navigation.navigate("Settings");
  };

  const handleUploadCloud = () => {
    navigation.navigate("UploadCloud");
  };

  
  return (
    <View style={commonStyles.screen}>
    <Header />
    <View style={commonStyles.body}>
        <View style={commonStyles.container}>
            <View style={commonStyles.row}>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleCreateReport()}
                >
                    
                    <Text style={commonStyles.cardText}>Criar Relatórios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleViewReports()}
                >
                    <Text style={commonStyles.cardText}>Ver Relatórios</Text>
                </TouchableOpacity>
            </View>
            <View style={commonStyles.row}>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleUploadCloud()}
                >
                    <Text style={commonStyles.cardText}>Enviar Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleConfigurations()}
                >
                    <Text style={commonStyles.cardText}>Configurações</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    <Footer navigation={navigation} />
    </View>
  );
}
