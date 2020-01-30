import { LoginScreen } from './views/login/Login';
import { RegisterScreen } from './views/register/Register';
import { AuthRoutes, RootRoutes } from './common/constants/routes';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import JokeListStack from './views/jokes';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { Provider as PaperProvider } from 'react-native-paper';
import { LoadingScreen } from './views/loading/Loading';
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { typeDefs, resolvers } from "./graphql/local";

const cache = new InMemoryCache();

const request = async (operation: any) => {
  if (
    operation.operationName !== "SignIn" &&
    operation.operationName !== "SignUp"
  ) {
    const token = await AsyncStorage.getItem("accessToken");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors, networkError);
      const msg = graphQLErrors && (graphQLErrors[0].message as any);
      if (msg && msg.statusCode === 401) {
        AsyncStorage.clear();
        const data = { isLoggedIn: false };
        cache.writeData({ data });
      }
    }),
    requestLink,
    new HttpLink({
      uri: "http://192.168.1.118:8080/graphql"
    })
  ]),
  cache,
  typeDefs,
  resolvers
});

(async () => {
  cache.writeData({
    data: {
      isLoggedIn: !!await AsyncStorage.getItem("accessToken")
    }
  });
})();

const RootStack = createSwitchNavigator({
  [AuthRoutes.Loading]: { screen: LoadingScreen, navigationOptions: { header: null } },
  [RootRoutes.JokeList]: { screen: JokeListStack, navigationOptions: { header: null } },
  [AuthRoutes.Login]: { screen: LoginScreen, navigationOptions: { header: null } },
  [AuthRoutes.Register]: { screen: RegisterScreen, navigationOptions: { header: null } },
});

const App = createAppContainer(RootStack);

function Main() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ApolloProvider>
  );
}

export default Main;
