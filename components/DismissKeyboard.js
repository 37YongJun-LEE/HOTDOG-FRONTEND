import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function DismissKeyboard({ children }) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={dismissKeyboard}
        >
            {children}
        </TouchableWithoutFeedback>
    );
}