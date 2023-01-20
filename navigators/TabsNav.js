import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabIcons from "../components/auth/nav/TabIcon";
import StackNavFactory from "../components/auth/nav/StackNavFactory";



const Tabs = createBottomTabNavigator()

export default function TabsNav(){
    return (
    <Tabs.Navigator
            screenOptions={{headerShown:false}}
            tabBarOptions={{
            showLabel:false,
        }}
    >
        <Tabs.Screen 
            name="Feed" 
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcons iconName={"home"} color={color} focused={focused} />
                )
            }}
        >
            {() => <StackNavFactory screenName="Feed" />}
        </Tabs.Screen>
        <Tabs.Screen 
            name="Messages" 
            options={{
                tabBarStyle:{display:'none'},
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcons iconName={"chatbubble"} color={color} focused={focused} />
                )
            }}    
        >
            {() => <StackNavFactory screenName="Messages" />}
        </Tabs.Screen>
        <Tabs.Screen 
            name="Mathcing" 
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons name="dog" color={color} size={22} />
                )
            }} 
        >
            {() => <StackNavFactory screenName="Matching" />}
        </Tabs.Screen>
        <Tabs.Screen 
            name="Me" 
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcons iconName={"person"} color={color} focused={focused} />
                )
            }} 
        >
            {() => <StackNavFactory screenName="Me" />}
        </Tabs.Screen>
    </Tabs.Navigator>
    );
}