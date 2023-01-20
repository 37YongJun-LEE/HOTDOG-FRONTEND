import { gql, useQuery } from "@apollo/client";
import React, {useState} from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { USER_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const LIKES_QUERY = gql`
    query seePostLikes($id: Int!) {
        seePostLikes(id: $id) {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

export default function Likes({route}) {
    const [refreshing, setRefreshing] = useState(false);
    const {data,loading, refetch } = useQuery(LIKES_QUERY,{
        variables:{
            id: route?.params?.photoId,
        },
        skip: !route?.params?.photoId,
    });
    const renderUser = ({item:userdb})=><UserRow {...userdb} />;
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            width: "100%",
                            height: 2,
                            backgroundColor: "rgba(105, 105, 105, 0.2)",
                        }}
                    >
                    </View>
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={data?.seePostLikes}
                keyExtractor={(item)=> "" + item.id}
                renderItem={renderUser}
                style={{width:"100%"}}
            />
        </ScreenLayout>
    );
}