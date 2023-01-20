import AppLoading from "expo-app-loading";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() { 
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font]
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://cdn-icons-png.flaticon.com/512/3460/3460473.png"
    ];
    const imagesPromises = imagesToLoad.map((images) => Asset.loadAsync(images));
    return Promise.all([...fontPromises,...imagesPromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if(token){
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    });
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}