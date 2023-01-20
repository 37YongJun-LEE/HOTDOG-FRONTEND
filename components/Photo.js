import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import PropTypes from 'prop-types';
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions, Image } from "react-native"; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;
const Header = styled.TouchableOpacity`
    padding: 20px 10px;
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image``;
const Username = styled.Text`
    font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Action = styled.TouchableOpacity`
    margin-right: 10px;
`;
const Caption = styled.View`
    flex-direction: row;
`;
const CaptionText = styled.Text`
    margin-left: 5px;
`;
const Likes = styled.Text`
    margin: 7px 0px;
    font-weight: 600;
`;
const ExtraContainer = styled.View`
    padding: 10px
`;

function Photo({id, userdb, post_content, post_images, isLiked, post_likes_cnt}){
    const navigation = useNavigation();
    const {width, height} = useWindowDimensions();
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;
        if (ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    post_likes_cnt(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                },
            });
        }
    };
    const [toggleLikeMutation, { loading: likeLoading }] = useMutation(
        TOGGLE_LIKE_MUTATION,
        {
            variables: {
                id,
            },
            update: updateToggleLike,
        }
    );
    const goToProfile = () => {
        navigation.navigate("Profile", {
            user_nam: userdb.user_name,
            id: userdb.id,
        })
    }
    return (
        <Container>
            <Header onPress={goToProfile}>
                <UserAvatar />
                <Username>{userdb.user_name}</Username>
            </Header>
            <File
                // resizeMode="contain"
                style={{
                    width,
                    height: height - 450,
                }}
                source={{ uri: post_images }}
            />
            <ExtraContainer>
                <Actions>
                    <Action onPress={toggleLikeMutation}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            color={isLiked ? "tomato" : "black"}
                            size={30}
                        />
                    </Action>
                    <Action onPress={() => navigation.navigate("Comments")}>
                        <Ionicons name="chatbox-outline" size={30} />
                    </Action>
                </Actions>
                <TouchableOpacity onPress={() => navigation.navigate("Likes", {
                    photoId: id,
                })}>
                    <Likes>{post_likes_cnt === 1 ? "1 like" : `${post_likes_cnt} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={goToProfile}>
                        <Username>{userdb.user_name}</Username>
                    </TouchableOpacity>
                    <CaptionText>{post_content}</CaptionText>
                </Caption>
            </ExtraContainer>
        </Container>
    );
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    userdb: PropTypes.shape({
        user_name: PropTypes.string.isRequired,
    }),
    post_content: PropTypes.string,
    post_images: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    post_likes_cnt: PropTypes.number.isRequired,
    post_comments_cnt: PropTypes.number.isRequired,
};
export default Photo;