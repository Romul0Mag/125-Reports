import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { commonStyles } from "../styles/styles";

export default function Footer({ navigation }) {
  return (
    <View style={commonStyles.footer}>
      <Icon
        name="home"
        size={30}
        color="#141414"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
