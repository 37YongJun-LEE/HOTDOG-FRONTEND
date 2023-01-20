import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import MessageNav from "./MessagesNav"
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

export default function LoggedInNav(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" options={{headerShown: false}} component={TabsNav} />
            <Stack.Screen name="Upload" options={{headerBackTitleVisible:false, title:"", headerShown: false}} component={UploadNav}/>
            <Stack.Screen name="Messages" component={MessageNav}/>
        </Stack.Navigator>
    );
}