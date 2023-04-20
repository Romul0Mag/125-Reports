import React from "react";
import { Text, View } from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function CreateReport({ navigation }) {
  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.body}>
        <Text>Create Report</Text>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}
