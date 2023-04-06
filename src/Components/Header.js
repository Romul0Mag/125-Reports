import { Text, View } from "react-native";

import { commonStyles } from "../styles/styles";

export default function Header() {
  return (
    <View style={commonStyles.header}>
      <Text style={commonStyles.text}>125 Reports</Text>
    </View>
  );
}
