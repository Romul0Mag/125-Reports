import CameraButton from './MyCamera';
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import ViewShot from "react-native-view-shot";
import Icon from "react-native-vector-icons/AntDesign";
import * as Sharing from "expo-sharing";


import Header from "../Components/Header";

import { commonStyles } from "../styles/styles";

export default function ReportDetails({ navigation, GlobalState, route }) {
  const { reportId, equipmentId, type, userId, companyId, error } =
    route.params;

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
      if (!error) {
        const equipmentUrl = `http://10.0.2.2:8000/measures/equipment_id=${equipmentId}`;
        const response = await fetch(equipmentUrl);

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.log("Error:", response.status);
          return [
            {
              report_id: "7ce7f290-32f4-4bce-8504-a7eca3542d23",
              type: "entrada",
              v: 23.4,
              c: 1.11,
              p: 13.3,
              total_current: 7.11,
              total_pot: 17.99,
              measure_id: "f605637b-c9fd-458a-bc36-89995a28cc26",
            },
          ];
        }
      }
      return [
        {
          report_id: "7ce7f290-32f4-4bce-8504-a7eca3542d23",
          type: "entrada",
          v: 23.4,
          c: 1.11,
          p: 13.3,
          total_current: 7.11,
          total_pot: 17.99,
          measure_id: "f605637b-c9fd-458a-bc36-89995a28cc26",
        },
      ];
    } catch (error) {
      console.log("Error:", error.message);
      return [
        {
          report_id: "7ce7f290-32f4-4bce-8504-a7eca3542d23",
          type: "entrada",
          v: 23.4,
          c: 1.11,
          p: 13.3,
          total_current: 7.11,
          total_pot: 17.99,
          measure_id: "f605637b-c9fd-458a-bc36-89995a28cc26",
        },
      ];
    }
  };

  const getCompanyInfo = async (companyName) => {
    try {
      if (!error) {
        const equipmentUrl = `http://10.0.2.2:8000/companies/company_name=${companyName}`;
        const response = await fetch(equipmentUrl);

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.log("Error:", response.status);
          return [
            {
              address_id: "b21dc5e6-c8d3-4a16-8e13-061e89a6a448",
              name: "PiriEnterprise",
              phone_number: "62992819494",
              company_id: "99950f0a-6eac-408a-8b5a-1302b1d572b0",
            },
          ];
        }
      }
      return [
        {
          address_id: "b21dc5e6-c8d3-4a16-8e13-061e89a6a448",
          name: "PiriEnterprise",
          phone_number: "62992819494",
          company_id: "99950f0a-6eac-408a-8b5a-1302b1d572b0",
        },
      ];
    } catch (error) {
      console.log("Error:", error.message);
      return [
        {
          address_id: "b21dc5e6-c8d3-4a16-8e13-061e89a6a448",
          name: "PiriEnterprise",
          phone_number: "62992819494",
          company_id: "99950f0a-6eac-408a-8b5a-1302b1d572b0",
        },
      ];
    }
  };

  const getUserInfo = async (userEmail) => {
    try {
      if (!error) {
        const userUrl = `http://10.0.2.2:8000/users/email=${userEmail}`;
        const response = await fetch(userUrl);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.log("Error:", response.status);
          return [
            {
              email: "luis.ruiz@ga.ita.br",
              name: "Zuin",
              phone_number: "62992819494",
              user_id: "678ad847-65be-40f6-9c61-348b9e99f29a",
            },
          ];
        }
      }
      return [
        {
          email: "luis.ruiz@ga.ita.br",
          name: "Zuin",
          phone_number: "62992819494",
          user_id: "678ad847-65be-40f6-9c61-348b9e99f29a",
        },
      ];
    } catch (error) {
      console.log("Error:", error.message);
      return [
        {
          email: "luis.ruiz@ga.ita.br",
          name: "Zuin",
          phone_number: "62992819494",
          user_id: "678ad847-65be-40f6-9c61-348b9e99f29a",
        },
      ];
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

      c;
    };

    fetchData();
  }, []);

  const [hasPermission, setHasPermission] = useState(false);
  const [isViewShotReady, setIsViewShotReady] = useState(false);
  const viewRef = useRef(null);

  useEffect(() => {
    async function requestStoragePermission() {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setHasPermission(status === "granted");
    }
    requestStoragePermission();
  }, []);

  const generateCSV = (data) => {
    let csvContent = ""; // Cabeçalho do CSV

    data.forEach((item) => {
      for (const key in item) {
        const title = key;
        const value = item[key];
        csvContent += `${title}: ${value}\n`; // Adiciona cada par de título-valor em uma nova linha
      }
    });

    return csvContent;
  };
  const saveAndShareFile = async (content) => {
    const fileUri = FileSystem.documentDirectory + "data.csv";
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Verifica se o dispositivo tem uma capacidade de compartilhamento
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      // Abra o diálogo de compartilhamento
      await Sharing.shareAsync(fileUri);
    } else {
      alert(`O arquivo CSV foi salvo em: ${fileUri}`);
    }
  };

  const handleSave = () => {
    const csvContent = generateCSV(textData);
    saveAndShareFile(csvContent);
  };

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

  const [selectedImage, setSelectedImage] = useState(null);


  const textData = [
    {
      "Tipo de Relatório": reportType,
      "Nome do cliente": clientName,
      "Telefone do cliente": clientPhoneNumber,
      "E-mail do cliente": clientEmail,
      "Nome da empresa": companyName,
      "Telefone da empresa": companyPhoneNumber,
      "Endereço da empresa": street,
      "Cidade da empresa": city,
      "Estado da empresa": state,
      "CEP da empresa": cep,
      "País da empresa": country,
      "Fabricante do Nobreak": manufecturer,
      "Modelo do Nobreak": model,
      "Número de Série do Nobreak": seriesNumber,
      "Potência do Nobreak": power,
      "Data de fabricação do Nobreak": fabricationDate,
      "Nobreak possui place de rede?": hasNetworkCard,
      "Nobreak possui cabo Ethernet?": hasEthCable,
      "Tipo de Medição do Nobreak": measureType,
      "V do Nobreak": V,
      "C do Nobreak": C,
      "P do Nobreak": P,
      "Corrente total do Nobreak": totalCurrent,
      "Potência total do Nobreak": totalPot,
    },
  ];
  return (
    <View style={commonStyles.screen}>
      <Header />
      <ScrollView contentContainerStyle={commonStyles.createReportContainer}>

        <ViewShot
          ref={viewRef}
          options={{ format: "jpg", quality: 0.9 }}
          onLayout={() => setIsViewShotReady(true)}
        >
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

          <Text style={commonStyles.titulo}>
            Preventive Tension Resistance:
          </Text>

          <View style={commonStyles.campoContainer}>
            <Text style={commonStyles.rotulo}>Resistencia:</Text>
            <Text style={commonStyles.rotulo}>{resistance}</Text>
          </View>

          <View style={commonStyles.campoContainer}>
            <Text style={commonStyles.rotulo}>Tensão:</Text>
            <Text style={commonStyles.rotulo}>{tension}</Text>
          </View>
          <CameraButton />
        </ViewShot>
        
        <View style={styles.container}>
          <TouchableOpacity style={ commonStyles.button } onPress={handleSave}>
            <Text style={styles.text}>☁️ Baixar CSV</Text>
          </TouchableOpacity>
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


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  button: {
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});