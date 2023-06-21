import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function ReportDetails({ navigation, GlobalState, route }) {
  const { reportId, equipmentId, type, userId, companyId } = route.params;

  const [clientName, setClientName] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyPhoneNumber, setPhoneNumber] = useState("");

  const [V, setV] = useState("");
  const [C, setC] = useState("");
  const [P, setP] = useState("");
  const [totalCurrent, setTotalCurrent] = useState("");
  const [totalPot, setTotalPot] = useState("");

  const getEquipmentInfo = async (equipmentId) => {
    try {
      const equipmentUrl = `http://10.0.2.2:8000/measures/equipment_id=${equipmentId}`;
      const response = await fetch(equipmentUrl);

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const getCompanyInfo = async (companyName) => {
    try {
      const equipmentUrl = `http://10.0.2.2:8000/companies/company_name=${companyName}`;
      const response = await fetch(equipmentUrl);

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const getUserInfo = async (userEmail) => {
    try {
      const userUrl = `http://10.0.2.2:8000/users/email=${userEmail}`;
      const response = await fetch(userUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEquipmentInfo(equipmentId);
      setV(data[0].v);
      setC(data[0].c);
      setP(data[0].p);
      setTotalCurrent(data[0].total_current);
      setTotalPot(data[0].total_pot);

      const companyData = await getCompanyInfo("PiriEnterprise");
      setCompanyName(companyData[0].name);
      setPhoneNumber(companyData[0].phone_number);

      const userData = await getUserInfo("luis.ruiz@ga.ita.br");
      console.log(userData);
      setClientName(userData[0].name);
      setClientPhoneNumber(userData[0].phone_number);
      setClientEmail(userData[0].email);

      c
    };

    fetchData();
  }, []);

  const reportType = "Tipo 1";
  const street = "Rua Nunes Machado, 977";
  const city = "Araras";
  const state = "São Paulo";
  const cep = "13600-021";
  const country = "Brasil";
  const tension = "";
  const resistance = "";
  const measureType = "Medição 1";
  const manufecturer = "Caixa NoBreaks";
  const model = "1";
  const power = "125";
  const seriesNumber = "12";
  const fabricationDate = "12/10/2017";
  const hasNetworkCard = "Sim";
  const hasEthCable = "Não";

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
        <View style={commonStyles.footerSpecial}>
          <Icon
            name="home"
            size={30}
            color="#141414"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
