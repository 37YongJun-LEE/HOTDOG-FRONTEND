import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../hooks/useMe";

export default function Me({navigation}) {
    const { data } = useMe();
    useEffect(() => {
        navigation.setOptions({
            title: data?.me?.user_name,
        });
    }, []);
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >            
            <Text>Me</Text>
        </View>
    );
}