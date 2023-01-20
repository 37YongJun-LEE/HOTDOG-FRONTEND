import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { ReactNativeFile } from "apollo-upload-client";
import { interpolate } from "react-native-reanimated";



const CREATE_PET_MUTATION = gql`
    mutation createPet(
        $pet_name: String!
        $pet_age: String!
        $pet_gender: String!
        $pet_kinds: String!
        $pet_image: Upload!
    ) {
        createPet(
            pet_name: $pet_name
            pet_age: $pet_age
            pet_gender: $pet_gender
            pet_kinds: $pet_kinds
            pet_image: $pet_image
        ) {
            ok
            error
        }
    }
`;


export default function CreatePet({route,navigation}){
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onCompleted = (data) => {
        const { createPet: { ok },
        } = data;
        const { user_id, user_pw } = getValues();
        if (ok) {
            navigation.navigate("LogIn", {
                user_id,
                user_pw
            })
        }
    };
    const [createPetMutation, { loading }] = useMutation(
        CREATE_PET_MUTATION,
        {
            onCompleted,
        }
    );
    const nameRef = useRef();
    const sexRef = useRef();
    const ageRef = useRef();
    const kindRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }
    const onValid = ({pet_name,pet_age,pet_gender,pet_kinds}) => {
        const pet_image = new ReactNativeFile({
            uri: route.params.pet_image,
            name: `1.jpg`,
            type: 'images/jpg',
          });        
          console.log(pet_image)
        if (!loading) {
            createPetMutation({
                variables: {
                    pet_name,
                    pet_age,
                    pet_gender,
                    pet_kinds,
                    pet_image
                }
            });
        }
    };
    useEffect(() => {
        register("pet_name", {
            required: true,
        });
        register("pet_age", {
            required: true,
        });
        register("pet_gender", {
            required: true,
        });
        register("pet_kinds", {
            required: true,
        });
    }, [register]);
    return (
        <AuthLayout>
            <TextInput ref={nameRef} placeholder="반려동물 이름" autoCapitalize={"none"} returnKeyType="next" onSubmitEditing={() => onNext(ageRef)} onChangeText={(text) => setValue("pet_name", text)} />
            <TextInput ref={ageRef} placeholder="반려동물 나이" returnKeyType="next" keyboardType="number-pad" onSubmitEditing={() => onNext(sexRef)} onChangeText={(text) => setValue("pet_age", text)} />
            <TextInput ref={sexRef} placeholder="반려동물 성별" returnKeyType="next" onSubmitEditing={() => onNext(kindRef)} onChangeText={(text) => setValue("pet_gender", text)} />
            <TextInput ref={kindRef} placeholder="반려동물 종" returnKeyType="next" onChangeText={(text) => setValue("pet_kinds", text)} />
            <TouchableOpacity onPress={() => navigation.navigate("SelectPetPhoto")}><Text >반려동물 사진</Text></TouchableOpacity>
            <Image resizeMode="center" source={{ uri: route?.params?.pet_image }} style={{height: 200}}/>
            <AuthButton text="회원가입" disabled={false} onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}