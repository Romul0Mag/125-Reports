import React from "react";
import { TextInput, View, Text, ScrollView, Button } from "react-native";

import RNPickerSelect from "react-native-picker-select";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function ReportDetails({ navigation, GlobalState, route }) {
  const { reportId } = route.params;
  const reportType = "";
  const clientName = "";
  const clientPhoneNumber = "";
  const clientEmail = "";
  const companyName = "";
  const companyPhoneNumber = "";
  const street = "";
  const city = "";
  const state = "";
  const cep = "";
  const country = "";
  const V = "";
  const C = "";
  const P = "";
  const totalCurrent = "";
  const totalPot = "";
  const tension = "";
  const resistance = "";
  const measureType = "";
  const manufecturer = "";
  const model = "";
  const power = "";
  const seriesNumber = "";
  const fabricationDate = "";
  const hasNetworkCard = "";
  const hasEthCable = "";

  return (
    <View style={commonStyles.screen}>
      <Header />
      <ScrollView contentContainerStyle={commonStyles.createReportContainer}>
        <Text style={commonStyles.titulo}>
          Relatório de Manutenção Preventiva - Nobreak
        </Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tipo de Relatório:</Text>
          <Text style={commonStyles.rotulo}>{reportType}</Text>
        </View>

        <Text style={commonStyles.titulo}>Dados do Cliente</Text>
        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Cliente:</Text>
          <Text style={commonStyles.rotulo}>{clientName}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tel.:</Text>
          <Text style={commonStyles.rotulo}>{clientPhoneNumber}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>E-mail:</Text>
          <Text style={commonStyles.rotulo}>{clientEmail}</Text>
        </View>

        <Text style={commonStyles.titulo}>Dados do Local</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Nome da empresa:</Text>
          <Text style={commonStyles.rotulo}>{companyName}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tel.:</Text>
          <Text style={commonStyles.rotulo}>{companyPhoneNumber}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Endereço:</Text>
          <Text style={commonStyles.rotulo}>{street}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Cidade:</Text>
          <Text style={commonStyles.rotulo}>{city}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Estado:</Text>
          <Text style={commonStyles.rotulo}>{state}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>CEP:</Text>
          <Text style={commonStyles.rotulo}>{cep}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>País:</Text>
          <Text style={commonStyles.rotulo}>{country}</Text>
        </View>

        <Text style={commonStyles.titulo}>Dados do Nobreak</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Fabricante:</Text>
          <Text style={commonStyles.rotulo}>{manufecturer}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Modelo:</Text>
          <Text style={commonStyles.rotulo}>{model}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Número de Série:</Text>
          <Text style={commonStyles.rotulo}>{seriesNumber}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Potência:</Text>
          <Text style={commonStyles.rotulo}>{power}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Data de fabricação:</Text>
          <Text style={commonStyles.rotulo}>{fabricationDate}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Possui placa de rede?</Text>
          <Text style={commonStyles.rotulo}>{hasNetworkCard}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Possui cabo Ethernet?</Text>
          <Text style={commonStyles.rotulo}>{hasEthCable}</Text>
        </View>

        <Text style={commonStyles.titulo}>Medidas do Nobreak</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tipo de Medição:</Text>
          <Text style={commonStyles.rotulo}>{measureType}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>V:</Text>
          <Text style={commonStyles.rotulo}>{V}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>C:</Text>
          <Text style={commonStyles.rotulo}>{C}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>P:</Text>
          <Text style={commonStyles.rotulo}>{P}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Corrente total:</Text>
          <Text style={commonStyles.rotulo}>{totalCurrent}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Potência total:</Text>
          <Text style={commonStyles.rotulo}>{totalPot}</Text>
        </View>

        <Text style={commonStyles.titulo}>Preventive Tension Resistance:</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Resistencia:</Text>
          <Text style={commonStyles.rotulo}>{resistance}</Text>
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tensão:</Text>
          <Text style={commonStyles.rotulo}>{tension}</Text>
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}
