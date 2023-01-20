import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO } from "../fragments";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPost($post_images: Upload!, $post_content: String) {
    uploadPost(post_images: $post_images, post_content: $post_content) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
    const updateUploadPost = (cache, result) => {
      const {
        data: { uploadPost },
      } = result;
      if (uploadPost.id) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeFeed(prev) {
              return [uploadPost, ...prev];
            },
          },
        });
        navigation.navigate("Tabs");
      }
    };
    const [uploadPostMutation, { loading }] = useMutation(
      UPLOAD_PHOTO_MUTATION,
      {
        update: updateUploadPost,
      }
    );
    const HeaderRight = () => (
      <TouchableOpacity onPress={handleSubmit(onValid)}>
        <HeaderRightText>Next</HeaderRightText>
      </TouchableOpacity>
    );
    const HeaderRightLoading = () => (
      <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
    );
    const { register, handleSubmit, setValue } = useForm();
    useEffect(() => {
      register("post_content");
    }, [register]);
    useEffect(() => {
      navigation.setOptions({
        headerRight: loading ? HeaderRightLoading : HeaderRight,
        ...(loading && { headerLeft: () => null }),
      });
    }, [loading]);
    const onValid = ({ post_content }) => {
      const post_images = new ReactNativeFile({
        uri: route.params.post_images,
        name: `1.jpg`,
        type: 'images/jpg',
      });
      console.log(post_images);
      uploadPostMutation({
        variables: {
          post_content,
          post_images,
        },
      });
    };
    return (
      <DismissKeyboard>
        <Container>
          <Photo resizeMode="contain" source={{ uri: route?.params?.post_images }} />
          <CaptionContainer>
            <Caption
              returnKeyType="done"
              placeholder="문구를 입력하세요..."
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onSubmitEditing={handleSubmit(onValid)}
              onChangeText={(text) => setValue("post_content", text)}
            />
          </CaptionContainer>
        </Container>
      </DismissKeyboard>
    );
  }