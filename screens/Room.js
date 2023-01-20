import { gql, useMutation, useQuery, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id 
      content
      userdb {
        user_name
      }
      read
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($content: String!, $chatroom_id: Int, $user_id: Int){
    sendMessage(
      content: $content,
      chatroom_id: $chatroom_id,
      user_id: $user_id
    ){
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id:Int!){
    seeRoom(id:$id){
      id
      chatmessagedb {
        id
        content
        userdb {
          user_name
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View`
`;
const Message = styled.Text`
  color: black;
  background-color: rgba(0, 255, 0,0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius:10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
`;

export default function Room({ route, navigation }) {
  const {data:meData} = useMe();
  const {register, setValue, handleSubmit, getValues, watch} = useForm();
  const updateSendMessage = (cache, result) => {
    const {data:{sendMessage:{ok,id}}} = result;
    if(ok && meData){
      const {chatmessagedb} = getValues();
      setValue("chatmessagedb", "");
      const messageObj = {
        id,
        content:chatmessagedb,
        userdb: {
          user_name: meData.me.user_name,
        },
        read:true,
        __typename:"chatmessagedb",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on chatmessagedb {
            id
            content
            userdb {
              user_name
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `chatroomdb:${route.params.id}`,
        fields: {
          chatmessagedb(prev){
            console.log(prev);
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [sendMessageMutation, {loading:sendingMessage}] = useMutation(SEND_MESSAGE_MUTATION,{
    update: updateSendMessage,
  })
  const {data, loading, subscribeToMore} = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const client = useApolloClient();
  const updateQuery = (prevQuery, options) => {
    console.log(options)
  };
  const [subscribed, setSubscribed] = useState(false)
  useEffect(() => {
     if (data?.seeRoom && !subscribed) {
       subscribeToMore({
         document: ROOM_UPDATES,
         variables: {
           id: route?.params?.id,
         },
         updateQuery,
       });
       setSubscribed(true)
     }
   }, [data, subscribed]);
  const onValid = ({chatmessagedb}) => {
    if(!sendingMessage){
      sendMessageMutation({
        variables: {
          content:chatmessagedb,
          chatroom_id:route?.params?.id,
        },
      });
    }
  };
  useEffect(() => {
    register("chatmessagedb", {required:true});
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.user_name}`
    });
  }, []);
  const renderItem = ({item:chatmessagedb}) => (
    <MessageContainer outGoing={chatmessagedb.userdb.user_name !== route?.params?.talkingTo?.user_name}>
      <Author>
        <Ionicons name="person-circle" size={50}/>
      </Author>
      <Message>{chatmessagedb.content}</Message>
    </MessageContainer>
  );
  const messages = [...(data?.seeRoom?.chatmessagedb ?? [])];
  messages.reverse()
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior="height" keyboardVerticalOffset={50}>
      <ScreenLayout loading={loading}>
        <FlatList 
          style={{width:"100%", marginVertical: 10}}
          inverted
          ItemSeparatorComponent={() => <View style={{height:20}}></View>}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={chatmessagedb => "" + chatmessagedb.id}
          renderItem={renderItem}
        />
        <TextInput 
          placeholder="메세지를 입력하세요"
          onChangeText={(text) => setValue("chatmessagedb",text)}
          onSubmitEditing={handleSubmit(onValid)}
          value={watch("chatmessagedb")}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}