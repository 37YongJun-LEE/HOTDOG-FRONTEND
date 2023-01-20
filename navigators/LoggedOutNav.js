import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";
import CreatePet from "../screens/CreatePet";
import SelectPetPhoto from "../screens/SelectPetPhoto";

const Stack = createStackNavigator();

export default function LoggedOutNav(){
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible:false,
                headerTintColor:"black",
                headerTitle:"",
                headerTransparent:true,
            }}
        >
            <Stack.Screen name="Welcome" options={{
                headerShown:false
            }} component={Welcome}/>
            <Stack.Screen name="LogIn" component={LogIn}/>
            <Stack.Screen name="CreateAccount" component={CreateAccount}/>
            <Stack.Screen name="CreatePet" component={CreatePet}/>
            <Stack.Screen name="SelectPetPhoto"  component={SelectPetPhoto}/>
        </Stack.Navigator>
    );
}