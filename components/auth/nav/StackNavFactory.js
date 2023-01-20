import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../../../screens/Photo";
import Profile from "../../../screens/Profile";
import Feed from "../../../screens/Feed";
import MessagesNav from "../../../navigators/MessagesNav";
import Matching from "../../../screens/Matching";
import Me from "../../../screens/Me";
import Likes from "../../../screens/Likes";
import Comments from "../../../screens/Comments";
import SelectPhoto from "../../../screens/SelectPhoto";

const Stack = createStackNavigator();

export default function StackNavFactory({screenName}){
    return (
        <Stack.Navigator
            screenOptions={{
            //     headerBackTitleVisible: false,
            //     headerTintColor:"black",
                headerTitle:"",
            //     headerTransparent:true,
            }}
        >
                {screenName === "Feed" ? (
                    <Stack.Screen name={"Feed"} component={Feed}/>
                ) : null}
                {screenName === "Messages" ? (
                    <Stack.Screen name="Messages" component={MessagesNav} options={{headerShown: false}}/>               
                ) : null}
                {screenName === "Matching" ? (
                    <Stack.Screen name={"Matching"} component={Matching} />
                ) : null}
                {screenName === "Me" ? (
                    <Stack.Screen name={"Me"} component={Me} />
                ) : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="SelectPhoto" component={SelectPhoto} />
        </Stack.Navigator>
    );
}