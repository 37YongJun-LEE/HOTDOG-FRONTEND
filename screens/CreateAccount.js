import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $user_id: String!
        $user_pw: String!
        $user_name: String!
        $user_birth: String!
        $user_gender: String!
        $user_phone: String!
        $user_address: String!
    ) {
        createAccount(
            user_id: $user_id
            user_pw: $user_pw
            user_name: $user_name
            user_birth: $user_birth
            user_gender: $user_gender
            user_phone: $user_phone
            user_address: $user_address
        ) {
            ok
            error
        }
    }
`;

export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onCompleted = (data) => {
        const { createAccount: { ok },
        } = data;
        const { user_id, user_pw } = getValues();
        if (ok) {
            navigation.navigate("CreatePet", {
                user_id,
                user_pw
            })
        }
    };
    const [createAccountMutation, { loading }] = useMutation(
        CREATE_ACCOUNT_MUTATION,
        {
            onCompleted,
        }
    );
    const passwordRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const sexRef = useRef();
    const birthRef = useRef();
    const addressRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }
    const onValid = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data,
                }
            });
        }
    };
    useEffect(() => {
        register("user_id", {
            required: true,
        });
        register("user_pw", {
            required: true,
        });
        register("user_name", {
            required: true,
        });
        register("user_birth", {
            required: true,
        });
        register("user_gender", {
            required: true,
        });
        register("user_phone", {
            required: true,
        });
        register("user_address", {
            required: true,
        });
    }, [register])
    return (
        <AuthLayout>
            <TextInput autoFocus placeholder="아이디" returnKeyType="next" onSubmitEditing={() => onNext(passwordRef)} onChangeText={(text) => setValue("user_id", text)} />
            <TextInput ref={passwordRef} placeholder="패스워드" returnKeyType="next" secureTextEntry onSubmitEditing={() => onNext(nameRef)} onChangeText={(text) => setValue("user_pw", text)} />
            <TextInput ref={nameRef} placeholder="이름" autoCapitalize={"none"} returnKeyType="next" onSubmitEditing={() => onNext(phoneRef)} onChangeText={(text) => setValue("user_name", text)} />
            <TextInput ref={birthRef} placeholder="생년월일" returnKeyType="next" keyboardType="number-pad" onSubmitEditing={() => onNext(addressRef)} onChangeText={(text) => setValue("user_birth", text)} />
            <TextInput ref={sexRef} placeholder="성별" returnKeyType="next" onSubmitEditing={() => onNext(birthRef)} onChangeText={(text) => setValue("user_gender", text)} />
            <TextInput ref={phoneRef} placeholder="전화번호" returnKeyType="next" keyboardType="number-pad" onSubmitEditing={() => onNext(sexRef)} onChangeText={(text) => setValue("user_phone", text)} />
            <TextInput ref={addressRef} placeholder="주소" returnKeyType="done" onSubmitEditing={handleSubmit(onValid)} onChangeText={(text) => setValue("user_address", text)} />
            <AuthButton text="다음" disabled={false} onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}