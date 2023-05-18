import React, { useState } from "react";
import { TextInput, View, Text , ScrollView, Button } from "react-native";

import RNPickerSelect from 'react-native-picker-select';

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";
import axios from 'axios';

export default function CreateReport({ navigation, GlobalState }) {
  const { chosenTask } = GlobalState;

  const [reportType, setReportType] = useState(1);

  const [clientName, setClientName] = useState('');
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  // const [selectedDate, setSelectedDate] = useState('');
  const [companyName, setCompanyName] = useState("");

  const createReport = async () => {
    reportData = useState({
      company_id: 2,
      equipment_id: 2,
      user_id: 2,
      types: 'preventiva'
    })
    try {
      const response = await axios.post('http://localhost:8000/addresses', reportData);
      // O endereço foi criado com sucesso
      console.log(response.data);
    } catch (error) {
      // Ocorreu um erro ao criar o endereço
      console.error(error);
    }
  };
  const [companyPhoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");
  const [country, setCountry] = useState("");  

  const [V, setV] = useState("");
  const [C, setC] = useState("");
  const [P, setP] = useState("");
  const [totalCurrent, setTotalCurrent] = useState("");
  const [totalPot, setTotalPot] = useState("");

  const [tension, setTension] = useState("");
  const [resistance, setResistance] = useState("");
  
  const [measureType, setMeasureType] = useState("");
  const [manufecturer, setManufecturer] = useState("");
  const [model, setModel] = useState("");
  const [power, setPower] = useState("");
  const [seriesNumber, setSeriesNumber] = useState("");
  const [fabricationDate, setFabricationDate] = useState("");
  const [hasNetworkCard, setHasNetworkCard] = useState("");
  const [hasEthCable, setHasEthCable] = useState(""); 
  
  const handleSave = () => {
    // Redirecionar para a página inicial
    navigation.navigate("Home");
  };
  
  
  return (
    <View style={commonStyles.screen}>
      <Header />
      <ScrollView contentContainerStyle={commonStyles.createReportContainer}>
        <Text style={commonStyles.titulo}>Relatório de Manutenção Preventiva - Nobreak</Text>
  
        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tipo de Relatório:</Text>
          <RNPickerSelect
            style={commonStyles.campo}
            value={reportType}
            onValueChange={(itemValue) => setReportType(itemValue)}
            items={[
              { label: 'Selecione o tipo de relatório', value: '' },
              { label: 'Tipo 1', value: 'tipo1' },
              { label: 'Tipo 2', value: 'tipo2' },
              // Adicione mais opções de tipo de relatório conforme necessário
            ]}
          />
        </View>

        <Text style={commonStyles.titulo}>Dados do Cliente</Text>
        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Cliente:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setClientName}
            value={clientName}
            placeholder="Digite o nome do cliente ou código da agência"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tel.:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setClientPhoneNumber}
            value={clientPhoneNumber}
            placeholder="Digite o telefone do cliente"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>E-mail:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setClientEmail}
            value={clientEmail}
            placeholder="Digite o e-mail do cliente"
            placeholderTextColor="#CFCFCF"
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
            placeholderTextColor="#CFCFCF"
          />
        </View>
  
        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Tel.:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setPhoneNumber}
            value={companyPhoneNumber}
            placeholder="Digite o telefone da empresa"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Endereço:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setStreet}
            value={street}
            placeholder="Digite a rua da empresa"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Cidade:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setCity}
            value={city}
            placeholder="Digite a cidade da empresa"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Estado:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setState}
            value={state}
            placeholder="Digite o estado da empresa"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>CEP:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setCep}
            value={cep}
            placeholder="Digite o CEP da empresa"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>  
          <Text style={commonStyles.rotulo}>País:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setCountry}
            value={country}
            placeholder="Digite o país da empresa"  
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <Text style={commonStyles.titulo}>Dados do Nobreak</Text>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Fabricante:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setManufecturer}
            value={manufecturer}
            placeholder="Digite o fabricante do nobreak"
            placeholderTextColor="#CFCFCF"
          />  
        </View>

        <View style={commonStyles.campoContainer}>  
          <Text style={commonStyles.rotulo}>Modelo:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setModel}
            value={model}
            placeholder="Digite o modelo do nobreak"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Número de Série:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setSeriesNumber}
            value={seriesNumber}
            placeholder="Digite o número de série do nobreak"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Potência:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setPower}
            value={power}
            placeholder="Digite a potência do nobreak"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Data de fabricação:</Text>
          <TextInput
            style={commonStyles.campo}
            onChangeText={setFabricationDate}
            value={fabricationDate}
            placeholder="Digite a data de fabricação do nobreak"
            placeholderTextColor="#CFCFCF"
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Possui placa de rede?</Text>
          <RNPickerSelect
            style={commonStyles.campo}
            value={hasNetworkCard}
            onValueChange={(itemValue) => setHasNetworkCard(itemValue)}
            items={[
              { label: 'Selecione', value: '' },
              { label: 'Sim', value: 'sim' },
              { label: 'Não', value: 'nao' },
            ]}
          />
        </View>

        <View style={commonStyles.campoContainer}>
          <Text style={commonStyles.rotulo}>Possui cabo Ethernet?</Text>
          <RNPickerSelect
            style={commonStyles.campo}
            value={hasEthCable}
            onValueChange={(itemValue) => setHasEthCable(itemValue)}
            items={[
              { label: 'Selecione', value: '' },
              { label: 'Sim', value: 'sim' },
              { label: 'Não', value: 'nao' },
            ]}
          />
        </View>

        {reportType === 'tipo1' ? (
          <View>
            <Text style={commonStyles.titulo}>Medidas do Nobreak</Text>

            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>Tipo de Medição:</Text>
              <RNPickerSelect
                style={commonStyles.campo}
                value={measureType}
                onValueChange={(itemValue) => setMeasureType(itemValue)}
                items={[
                  { label: 'Selecione o tipo de medição', value: '' },
                  { label: 'Medição 1', value: 'medicao1' },
                  { label: 'Medição 2', value: 'medicao2' },
                  // Adicione mais opções de tipo de medição conforme necessário
                ]}
              />
            </View>


            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>V:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setV}
                value={V}
                placeholder="Digite o V do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>

            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>C:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setC}
                value={C}
                placeholder="Digite o C do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>


            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>P:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setP}
                value={P}
                placeholder="Digite o P do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>

            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>Corrente total:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setTotalCurrent}
                value={totalCurrent}
                placeholder="Digite a corrente total do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>

            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>Potência total:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setTotalPot}
                value={totalPot}

                placeholder="Digite a potência total do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={commonStyles.titulo}>Preventive Tension Resistance:</Text>

            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>Resistencia:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setResistance}
                value={resistance}
                placeholder="Digite a resistência do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>

            <View style={commonStyles.campoContainer}>
              <Text style={commonStyles.rotulo}>Tensão:</Text>
              <TextInput
                style={commonStyles.campo}
                onChangeText={setTension}
                value={tension}
                placeholder="Digite a tensão do nobreak"
                placeholderTextColor="#CFCFCF"
              />
            </View>      
          </View>
        ) }

        

        
     
        <Button title="Salvar" onPress={handleSave} />
  
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}
