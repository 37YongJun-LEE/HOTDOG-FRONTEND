import React, {useEffect} from "react";
import { Text, View } from "react-native";
import { logUserOut } from "../apollo";

logUserOut();

export default function Profile({ navigation, route }) {
    useEffect(() => {
        if (route?.params?.user_name) {
            navigation.setOptions({
                title: route.params.user_name,
            });
        }
    }, []);
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >            
            <Text>Hello</Text>
        </View>
    );
}