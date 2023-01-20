import React from "react";
import SelectPhoto from "../screens/SelectPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import UploadForm from "../screens/UploadForm"

const Stack = createStackNavigator();

export default function UploadNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Select" component={SelectPhoto}></Stack.Screen>
            <Stack.Screen name="UploadForm" component={UploadForm}></Stack.Screen>
        </Stack.Navigator>
    );
}