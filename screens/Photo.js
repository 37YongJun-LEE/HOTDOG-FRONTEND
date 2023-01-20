import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Photo({navigation}) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text>Photo</Text>
            </TouchableOpacity>
        </View>
    );
}