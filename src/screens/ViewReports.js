import React from "react";
import { Text, View } from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function ChosenTask({ navigation, GlobalState }) {
  const { chosenTask } = GlobalState;

  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.body}>
        <Text>View Reports</Text>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}
