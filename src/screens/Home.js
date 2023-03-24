import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Home({navigation, GlobalState}){
    const {toDoList, setToDoList, task, setTask, setChosenTask} = GlobalState;

    useEffect(()=>{
        setToDoList(prevState => [...prevState, {id:2, task:"lala"}])
    },[])    

    const renderItem = ({item})=>{
        return(
            <TouchableOpacity
                style={styles.task}
                onPress={()=>handleChooseTask(item)}
            >
                <Text>{item.task}</Text>
            </TouchableOpacity>
        );
        
    }

    const handleSaveTask = () => {
        const id = toDoList.length +1;
        
        setToDoList(prevState => [...prevState, { id: id, task:task}]);
        setTask('');
    }
    
    const handleChooseTask = (e) => {
        setChosenTask(e);
        navigation.navigate('ChosenTask');
    }

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <TextInput 
                    style={styles.input}
                    onChangeText={setTask}
                    value={task}
                    placeholder="To do Task..."
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>handleSaveTask()}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <FlatList 
                data={toDoList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
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
    header: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white'
    },
    body: {
        flex: 8 ,
        width: '100%',
        backgroundColor: '#14141410',
    },
    task: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        paddingTop:10,
        paddingBottom:10,
        margin: 10,
        marginTop: 30,
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        paddingTop:10,
        paddingBottom:10,
        margin: 10,
        marginTop: 30,
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#141414',
        padding: 15,
        paddingTop:10,
        paddingBottom:10,
        margin: 10,
        marginBottom: 30,
        borderRadius:12,
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
        color: 'white',
        fontWeight: '900',
    }
})