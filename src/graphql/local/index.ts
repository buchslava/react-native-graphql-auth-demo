import gql from "graphql-tag";
import { AsyncStorage } from 'react-native';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    changeLoggedStatus(status: Boolean!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    isLoggedIn: async () => {
      return !!await AsyncStorage.getItem("accessToken");
    }
  },
  Mutation: {
    changeLoggedStatus: (_root: any, variables: any, { cache }: any) => {
      const data = { isLoggedIn: variables.status };
      cache.writeData({ data });
      return variables.status;
    }
  }
};

export const CHECK_LOGGED_STATUS = gql`
  query checkIsLoggedIn {
    isLoggedIn @client
  }
`;

export const LOG_IN = gql`
  mutation LogIn($status: Boolean!) {
    changeLoggedStatus(status: $status) @client
  }
`;
