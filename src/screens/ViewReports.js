import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { commonStyles } from "../styles/styles";

export default function ViewReport({ navigation }) {
  const [reports, setReports] = useState([]);

  const getReports = async (companyName) => {
    try {
      const url = `http://10.0.2.2:8000/reports/company_name=${companyName}`;
      const response = await fetch(url);

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
      const data = await getReports("PiriEnterprise");
      setReports(data);
    };

    fetchData();
  }, []);

  const handleReportPress = (reportId, equipmentId,type, userId, companyId) => {
    navigation.navigate("ReportDetails", { reportId, equipmentId, type, userId, companyId});
  };

  return (
    <View style={commonStyles.screen}>
      <Header />
      <View style={commonStyles.body}>
        <View style={styles.container}>
          <View style={styles.table}>
            {reports.map((report) => (
              <TouchableOpacity
                key={report.report_id}
                style={styles.row}
                onPress={() => handleReportPress(report.report_id, report.equipment_id, report.type,report.user_id, report.company_id)}
              >
                <Text style={styles.title}>{report.report_id}</Text>
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
