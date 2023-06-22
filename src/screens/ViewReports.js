import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { commonStyles } from "../styles/styles";

export default function ViewReport({ navigation }) {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(false);

  const getReports = async (companyName) => {
    try {
      const url = `http://10.0.2.2:8000/reports/company_name=${companyName}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.log("Error:", response.status);
        setError(true);
        return undefined;
      }
    } catch (error) {
      console.log("Error:", error.message);
      setError(true);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReports("PiriEnterprise");
      if (data != undefined) {
        setReports(data);
      } else {
        setReports([
          {
            company_id: "99950f0a-6eac-408a-8b5a-1302b1d572b0",
            equipment_id: "c8229bbc-2fb2-4f1d-bc01-0dba8490a569",
            user_id: "678ad847-65be-40f6-9c61-348b9e99f29a",
            type: "preventiva",
            report_id: "7ce7f290-32f4-4bce-8504-a7eca3542d23",
          },
          {
            company_id: "99950f0a-6eac-408a-8b5a-1302b1d572b0",
            equipment_id: "c8229bbc-2fb2-4f1d-bc01-0dba8490a569",
            user_id: "678ad847-65be-40f6-9c61-348b9e99f29a",
            type: "preventiva",
            report_id: "74b5ef71-f650-4654-a076-f8302f2f5c3a",
          },
          {
            company_id: "99950f0a-6eac-408a-8b5a-1302b1d572b0",
            equipment_id: "c8229bbc-2fb2-4f1d-bc01-0dba8490a569",
            user_id: "678ad847-65be-40f6-9c61-348b9e99f29a",
            type: "corretiva",
            report_id: "8b38cb5d-dc6f-4932-9d84-62ed3e47aabb",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  const handleReportPress = (
    reportId,
    equipmentId,
    type,
    userId,
    companyId,
    error
  ) => {
    navigation.navigate("ReportDetails", {
      reportId,
      equipmentId,
      type,
      userId,
      companyId,
      error,
    });
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
                onPress={() =>
                  handleReportPress(
                    report.report_id,
                    report.equipment_id,
                    report.type,
                    report.user_id,
                    report.company_id,
                    error
                  )
                }
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
