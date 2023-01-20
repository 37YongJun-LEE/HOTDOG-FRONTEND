import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

const Column = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    
`;
const Username = styled.Text`
    font-weight: 600;
    padding: 15px 15px;
`;

const Wrapper = styled.View``;


export default function UserRow({ id, user_name }) {
    const navigation = useNavigation();
    return (
        <Wrapper>
            <Column onPress={() => navigation.navigate("Profile", {
                user_name,
                id,
            })}>
                <Username>{user_name}</Username>
            </Column>
        </Wrapper>
    );
}