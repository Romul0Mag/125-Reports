import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },

  footer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: "#14141410",
  },

  title: {
    fontSize: 32,
    marginBottom: 16,
    color: "white",
  },

  text: {
    fontSize: 18,
    fontWeight: "900",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#141414",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginBottom: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "900",
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",},
    
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: "black",
    fontWeight: "900",
    position: 'relative',
    top: 35,
  },
  icon: {
  },
});
