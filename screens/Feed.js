import { gql, useQuery } from "@apollo/client";
import React, {useState,useEffect} from "react";
import { TouchableOpacity, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { PHOTO_FRAGMENT } from "../fragments";
import Photo from "../components/Photo";
import { Ionicons } from "@expo/vector-icons";


const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            userdb {
                id
                user_name
            }
        }
    }
    ${PHOTO_FRAGMENT}
`;

export default function Feed({navigation}) {
    const {data, loading,refetch,fetchMore} = useQuery(FEED_QUERY, {
        variables: {
            offset: 0,
        }
    });
    const renderPhoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };
    const refresh = async() => {
        setRefreshing(true)
        await refetch();
        setRefreshing(false)
    }
    const [refreshing, setRefreshing] = useState(false);
    const HeaderRight = () => (
        <TouchableOpacity style={{ marginRight: 15 }}
          onPress={() =>
            navigation.navigate("Upload")
          }
        >
            <Ionicons name="add" size={40}/>
        </TouchableOpacity>
      );
      useEffect(() => {
        navigation.setOptions({
          headerRight: HeaderRight,
        });
      }, []);
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                onEndReachedThreshold={0.1}
                onEndReached={() => fetchMore({
                    variables: {
                        offset: data?.seeFeed?.length,
                    }
                })}
                refreshing={refreshing}
                onRefresh={refresh}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => "" + photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}