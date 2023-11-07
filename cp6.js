//npx create-react-native-app Cp6
//npx expo install react-native-screens react-native-safe-area-context
//npm i axios yup @react-navigation/native @react-navigation/bottom-tabs
//npm run android
//npm run build

// https://fiapcom-my.sharepoint.com/personal/pf1669_fiap_com_br/_layouts/15/stream.aspx?id=%2Fpersonal%2Fpf1669%5Ffiap%5Fcom%5Fbr%2FDocuments%2FVideos%2FHMAD%20%2D%20Revis%C3%A3o%20geral%20para%20o%20CP6%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0RpcmVjdCJ9fQ&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview&or=teams&ga=1
// 40:25

import React, { useState, useReducer, createContext } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { object, string, number } from 'yup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios'; // Import axios for HTTP requests
import { FlatList } from 'react-native'; // Import FlatList for rendering lists

const {Screen, Navigator} = createBottomTabNavigator();

const initialState = {
    list:[]
}

const initialContext = {
    id:"", 
    setId:(value)=>{},
    name:"",
    setName:(value)=>{},
    type:"",
    setType:(value)=>{},
    classification:"",
    setClassification:(value)=>{},
    state:{},
    dispatcher:(action)=>{},
    save:()=>{},
};

const Context = createContext(initialContext);

const reducerFunction = (state, { type, payload }) => {
    if (type === "CLEAR_LIST") {
        return { list: [] };
    } else if (type === "ADD_LIST") {
        return { list: [...state.list, payload] };
    }
    throw new Error("Invalid type in reducerFunction()");
};

const RestauranteSchema = object({
    name: string().required().min(3),
    type: string().required(),
    classification: number().required().min(0).max(5),
})

const persistRestApi = () => {
    const api = axios.create({
        baseURL: "https://fiap-restaurantes-default-rtdb.firebaseio.com",
    });

    const saveApi = (obj) => {
        return api.post("/restaurantes.json", obj);
    };

    return {
        saveApi,
    };
};


const useRestaurantControl = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [classification, setClassification] = useState("");

    const [state, dispatcher] = useReducer(reducerFunction, initialState); // Pass initialState to useReducer

    const { saveApi } = persistRestApi();

    const ClearStates = () => {
        setId("");
        setName("");
        setType("");
        setClassification("");
    };

    const save = () => {
        const obj = { name, type, classification };
        saveApi(obj)
            .then(() => {
                alert("Saved!");
                ClearStates();
            });
    };

    return {
        id, setId,
        name, setName,
        type, setType,
        classification, setClassification,
        state, dispatcher,
        save,
    };
};


const Form = () => {
    const control = useContext(Context);
    const { name, setName, type, setType, classification, setClassification, save } = control;
    const buttonName = control.id ? "Save" : "Register";

    const handleSave = () => {
        // Validate the input data using yup
        RestauranteSchema.validate({ name, type, classification })
            .then(() => {
                // Validation passed, proceed with saving
                save();
            })
            .catch((error) => {
                // Validation failed, display error message
                alert(error.message);
            });
    };

    return (
        <View>
            <TextInput placeholder="name" value={name} onChangeText={setName} />
            <TextInput placeholder="type" value={type} onChangeText={setType} />
            <TextInput placeholder="classification" value={classification} onChangeText={setClassification} />
            <Button title={buttonName} onPress={handleSave} />
        </View>
    );
};


const Item = ({ item }) => { // Receive the item as a prop
    return (
        <View>
            <Text>Restaurant Name: {item.name}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Classification: {item.classification}</Text>
        </View>
    );
};

const List = () => {
    const control = useContext(Context);
    const { state } = control;

    return (
        <View>
            <FlatList
                data={state.list}
                renderItem={({ item }) => <Item item={item} />}
            />
        </View>
    );
};


export default function App() {
    const control = useRestaurantControl();

    return (
        <Context.Provider value={control}>
        <NavigationContainer>
            <View>
                <Navigator>
                    <Screen name='Register' component={Form}/>
                    <Screen name='List' component={List}/>
                    <Screen name='Map'/>
                </Navigator>
            </View>
        </NavigationContainer>
        </Context.Provider>
    );
}
