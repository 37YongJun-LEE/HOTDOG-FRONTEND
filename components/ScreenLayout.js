import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function ScreenLayout({ loading, children }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {loading ? <ActivityIndicator /> : children}
        </View>
    );
}