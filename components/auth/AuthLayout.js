import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

const Container = styled.View`
    flex: 1;
    align-items:center;
    justify-content:center;
`;

const Logo = styled.Image`
    max-width:100%;
`;

export default function AuthLayout({children}){
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback style={{flex:1}} onPress={dismissKeyboard}>
        <Container>
        <KeyboardAvoidingView style={{
                width:"100%"
            }} behavior="position" keyboardVerticalOffset={20}>
            {children}
         </KeyboardAvoidingView>
        </Container>
        </TouchableWithoutFeedback>
    );
} 