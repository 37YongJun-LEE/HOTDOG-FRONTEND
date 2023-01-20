import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    makeVar,
    split,
  } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context"
import {offsetLimitPagination,getMainDefinition} from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import {WebSocketLink} from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token"

export const logUserIn = async(token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token); 
};

export const logUserOut = async() => {
  await AsyncStorage.removeItem(TOKEN)
  isLoggedInVar(false);
  tokenVar(null);
};

const uploadHttpLink = createUploadLink({
  uri: "https://8bcf-175-202-158-141.jp.ngrok.io/graphql",
});

// const wsLink = new WebSocketLink({
//   uri:'ws://e9ec-1-237-28-147.jp.ngrok.io/graphql',
//   options: {
//     reconnect: true,
//     connectionParams: () => ({
//       token: tokenVar(),
//     }),
//   },
// });

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://8bcf-175-202-158-141.jp.ngrok.io/graphql',
  connectionParams: {
    // authentication: user.authToken,
    token: tokenVar(),
  },
}));

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      token: tokenVar()
    }
  }
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperatioinDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            seeFeed: offsetLimitPagination(),
          },
        },
      },
    }),
});
export default client;