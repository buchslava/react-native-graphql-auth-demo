import React, { useEffect, useState } from 'react';
import { AsyncStorage, Text, View, Button, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useQuery } from "@apollo/react-hooks";
import { GET_JOKES } from "../../graphql/queries/jokes.queries";
import { Typography, Spacing } from '../../styles';
import { AuthRoutes } from '../../common/constants/routes';
import { Loader } from '../loader/Loader';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
};

export function AddJokeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <View><Button title={'Logout'} onPress={() => { }}><Text>Logout</Text></Button></View>
      <View>
        foo
      </View>
    </View>
  );
}
