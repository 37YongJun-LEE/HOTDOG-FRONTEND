import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
text-align: center;
margin-left: 0px;
    opacity:${(props) => (props.disabled ? "0.5":"1")};
`;
const ButtonText = styled.Text`
text-align: center;
    font-weight:600;
    font-size:30px;
`;

export default function AuthButton({onPress,disabled,text,loading}){
    return ( 
    <Button disabled={disabled} onPress={onPress}>
        {loading ? (<ActivityIndicator color="black"/>)  : (<ButtonText>{text}</ButtonText>)}
    
    </Button>
    );
}