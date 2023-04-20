import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function ChosenTask({ navigation, GlobalState }) {
  const { chosenTask } = GlobalState;
  const [clientName, setClientName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [telNumber, setTelNumber] = useState("");

  

  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.container}>
      <Text style={commonStyles.titulo}>Relatório de Manutenção Preventiva - Nobreak</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Cliente:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setClientName}
            value={clientName}
            placeholder="Digite o nome do cliente ou código da agência"
            placeholderTextColor= '#CFCFCF'
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Data:</Text>
            <TextInput
              style={commonStyles.campo}
              onChangeText={setSelectedDate}
              value={selectedDate}
              placeholder="Digite a data no formato dd/mm/aaaa"
              placeholderTextColor= '#CFCFCF'
            />
        </View>
        
        <Text style={commonStyles.titulo}>Dados do Local</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Nome da empresa:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setCompanyName}
            value={companyName}
            placeholder="Digite o nome da empresa"
            placeholderTextColor= '#CFCFCF'
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Contato:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setContact}
            value={contact}
            placeholder="Digite o contato"
            placeholderTextColor= '#CFCFCF'
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Depto.:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setDepartment}
            value={department}
            placeholder="Digite o departamento"
            placeholderTextColor= '#CFCFCF'
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tel.:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setTelNumber}
            value={telNumber}
            placeholder="Digite o telefone"
            placeholderTextColor= '#CFCFCF'
          />
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}
