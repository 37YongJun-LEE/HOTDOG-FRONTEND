import React, { useEffect, useRef } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar, logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($user_id: String!, $user_pw: String!) {
    login(user_id: $user_id, user_pw: $user_pw) {
      ok
      token
      error
    }
  }
`;

const Logo = styled.Image`
margin-left:100px;
max-width:50%;
`;

export default function LogIn({ route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      user_pw: params?.user_pw,
      user_id: params?.user_id,
    }
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
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
  }, [register]);
  return (
    <AuthLayout>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <TextInput
        value={watch("user_id")}
        placeholder="아이디"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("user_id", text)}
      />
      <TextInput
        value={watch("user_pw")}
        ref={passwordRef}
        placeholder="패스워드"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("user_pw", text)}
      />
      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("user_id") || !watch("user_pw")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
