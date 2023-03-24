import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ChosenTask({navigation, GlobalState}){
    const {chosenTask} = GlobalState;


    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <Text>
                    {chosenTask.task}
                </Text>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    body: {
        flex: 8 ,
        width: '100%',
        backgroundColor: '#14141410',
        alignItems: 'center',
        justifyContent: 'center'
    }

})