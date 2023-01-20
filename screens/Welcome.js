import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Container = styled.View`
    flex: 1;
    align-items:center;
    justify-content:center;
`;

const Logo = styled.Image`

    margin-left:100px;
    max-width:50%;
`;

const CreateAccount = styled.TouchableOpacity`
    opacity:${(props) => (props.disabled ? "0.5":"1")};
`;
const CreateAccountText = styled.Text`
    font-weight:600;
    font-size:30px;
`;
const LogInLink = styled.Text`
text-align:center;
    font-weight:600;
    font-size:20px;
    margin-top:50px;
`;

export default function Welcome({navigation}){
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("LogIn");
    return(
        <AuthLayout>
            <Logo resizeMode="contain" source={require("../assets/logo.png")}/>
            <AuthButton text="회원가입" disabled={false} onPress={goToCreateAccount}/>
            <TouchableOpacity onPress={goToLogIn}>
            <LogInLink>로그인</LogInLink>
            </TouchableOpacity>
        </AuthLayout>
        // <Container>
        //     <Logo resizeMode="contain" source={require("../assets/logo.png")}/>
        //     <CreateAccount disabled={false} onPress={goToCreateAccount}>
        //         <CreateAccountText>회원가입</CreateAccountText>
        //     </CreateAccount>
        //     <TouchableOpacity onPress={goToLogIn}>
        //     <LogInLink>로그인</LogInLink>
        //     </TouchableOpacity>
        // </Container>
    );
}