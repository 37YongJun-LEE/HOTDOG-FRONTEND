import { gql, useQuery } from "@apollo/client";
import React,{useEffect} from "react";
import { FlatList, TouchableOpacity } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragments";
import RoomItem from "../components/rooms/RoomItem";
import { Ionicons } from "@expo/vector-icons";


const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms({navigation}) {
  const {data, loading} = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({item:chatroomdb}) => <RoomItem {...chatroomdb} />
  const HeaderLeft = () => (
    <TouchableOpacity style={{ marginRight: 15 }}
      onPress={() =>
        navigation.navigate("Feed")
      }
    >
        <Ionicons name="close" size={40} color="white"/>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerLeft: HeaderLeft,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList 
        style={{width:"100%"}}
        data={data?.seeRooms}
        keyExtractor={chatroomdb => "" + chatroomdb.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  )
}