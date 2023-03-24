import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.text}>My to do list</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
    text: {
        fontSize: 18,
        fontWeight: '900',        
    }
})