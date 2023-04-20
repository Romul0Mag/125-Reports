import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings({ navigation, GlobalState }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationsSwitch = (value) => {
    setNotificationsEnabled(value);
  };
  return (
    <View style={commonStyles.screen}>
        <Header />
        <View style={commonStyles.body}>
          <View style={commonStyles.container_settings}>
            <View style={commonStyles.card_settings}>
              <Icon name="bell" size={24} color="#555" style={commonStyles.icon_settings} />
              <Text style={commonStyles.text_settings}>Permitir notificações</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleNotificationsSwitch}
                value={notificationsEnabled}
              />
            </View>
          </View>
        </View>  
        <Footer navigation={navigation} />
    </View>
  );
}
