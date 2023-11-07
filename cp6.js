//npx create-react-native-app Cp6
//npx expo install react-native-screens react-native-safe-area-context
//npm i axios yup @react-navigation/native @react-navigation/bottom-tabs
//npm run android
//npm run build

// https://fiapcom-my.sharepoint.com/personal/pf1669_fiap_com_br/_layouts/15/stream.aspx?id=%2Fpersonal%2Fpf1669%5Ffiap%5Fcom%5Fbr%2FDocuments%2FVideos%2FHMAD%20%2D%20Revis%C3%A3o%20geral%20para%20o%20CP6%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0RpcmVjdCJ9fQ&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview&or=teams&ga=1
// 40:25

import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { object, string, number } from 'yup'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

const {Screen, Navigator} = createBottomTabNavigator();

const defaultState = {
    list:[]
}

const reducerFunction = (state, {type, payload}) =>{
    if(type="CLEAR_LIST"){
        return{list:[]}
    }if(type="ADD_LIST"){
        return{list:[...state.list, payload]}
    }
    throw new Exception("Invalid type in reducerFunction()")
}

const RestauranteSchema = object({
    name: string().required().min(3),
    type: string().required(),
    classification: number().required().min(0).max(5),
})

const persistRestApi = () =>{
    const api = axios.create({
        baseUrl: "https://fiap-reaturantes-default-rtdb.firebaseio.com"
    })

    const saveApi = (obj) =>{
        return api.post("/restaurantes.json", obj);
    }
}

const useRestaurantControl = () =>{
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [classification, setClassification] = useState("");

    const [state, dispatcher] = useReducer(reducerFunction, initialState)

    const {saveApi} = persistRestApi();

    const ClearStates = () =>{
        setId("")
        setName("")
        setType("")
        setClassification("")
    }

    const save = () => {
        const obj = {name,type,classification}
        saveApi(obj)
        .then(()=>{
            alert("Saved!")
            ClearStates();
        })
    }

    return{
        id, setId,
        name, setName,
        type, setType,
        classification, setClassification,
        state,dispatcher,
        save
    }
}

const Form = () => {
    
    const {name, setName, 
        type, setType, 
        classification, setClassification, save}  = useRestaurantControl();

    const buttonName = id ? "Save" : "Register"
    // let buttonName = "Register"
    // if(id !== null){
    //     buttonName = "Save"
    // }

    return(
        <View>
            <TextInput placeholder="name" value={name} onChangeText={setName}/>
            <TextInput placeholder="type" value={type} onChangeText={setType}/>
            <TextInput placeholder="name" value={classification} onChangeText={setClassification}/>
            <Button title={buttonName} onPress={save}/>
        </View>
    )
}

const Item = () =>{
    return(
        <View>
            <Text>Restaurant Name: </Text>
            <Text>Type:</Text>
            <Text>Classification:</Text>
        </View>
    )
}

const List = () =>{
    return(
        <View>
            <FlatList data={state.list} renderItem={Item}/>
        </View>
    )
}

export default function App() {

    return (
        <NavigationContainer>
            <View>
                <Navigator>
                    <Screen name='Register' component={Form}/>
                    <Screen name='List' component={List}/>
                    <Screen name='Map'/>
                </Navigator>
            </View>
        </NavigationContainer>
    );
}


