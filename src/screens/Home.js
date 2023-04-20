import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Icon from "react-native-vector-icons/FontAwesome";

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
                    <Icon name="plus" size={50} color="#122CCB" style={commonStyles.icon} />
                    <Text style={commonStyles.cardText}>Criar Relatórios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleViewReports()}
                >
                    <Icon name="page-search" size={50} color="#122CCB" style={commonStyles.icon} />
                    <Text style={commonStyles.cardText}>Ver Relatórios</Text>
                </TouchableOpacity>
            </View>
            <View style={commonStyles.row}>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleUploadCloud()}
                >
                    <Icon name="page-edit" size={50} color="#122CCB" style={commonStyles.icon} />
                    <Text style={commonStyles.cardText}>Enviar Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.card}
                    onPress={() => handleConfigurations()}
                >
                    <Icon name="page-edit" size={50} color="#122CCB" style={commonStyles.icon} />
                    <Text style={commonStyles.cardText}>Configurações</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    <Footer navigation={navigation} />
    </View>
  );
}
