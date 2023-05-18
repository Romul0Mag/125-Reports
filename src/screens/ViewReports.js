import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import ReportDetailsPage from './ReportDetailsPage';

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { commonStyles } from "../styles/styles";

export default function ViewReport({ navigation }) {
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reports, setReports] = useState([{ id: "1", title: "PiriTech" }]);

  const handleReportPress = (reportId) => {
    navigation.navigate("ReportDetails", { reportId });
  };

  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.body}>
        <View style={styles.container}>
          <View style={styles.table}>
            {/* Render reports in a table */}
            {reports.map((report) => (
              <TouchableOpacity
                key={report.id}
                style={styles.row}
                onPress={() => handleReportPress(report.id)}
              >
                <Text style={styles.title}>{report.title}</Text>
                <Text>{report.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
    marginRight: 10,
  },
});
