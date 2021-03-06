import React, { useEffect, useState } from 'react';
import { AsyncStorage, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useQuery } from "@apollo/react-hooks";
import { GET_JOKES } from "../../graphql/queries/jokes.queries";
import { Typography, Spacing } from '../../styles';
import { AuthRoutes, RootRoutes } from '../../common/constants/routes';
import { Loader } from '../loader/Loader';
import { NavigationStackProp } from 'react-navigation-stack';
import { Button } from 'react-native-paper';

type Props = {
  navigation: NavigationStackProp;
};

interface IJoke {
  key: string;
  joke: string;
  author: string;
}

export function JokeListScreen({ navigation }: Props) {
  const { loading, data } = useQuery(GET_JOKES);
  const [dataForRender, setDataForRender] = useState();

  useEffect(() => {
    if (data) {
      setDataForRender(
        data.allJokes.items.map((item: any) => ({
          key: item.id,
          joke: item.joke,
          author: item.author.login
        }))
      );
    }
  }, [data]);

  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate(AuthRoutes.Login);
  };
  const gotoAddJoke = () => {
    navigation.navigate(RootRoutes.AddJoke);
  };
  const gotoMap = () => {
    navigation.navigate(RootRoutes.Map);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#eeeeee', width: '100%' }}>
        <Button style={styles.button} onPress={logOut}><Text>Logout</Text></Button>
        <Button style={styles.button} onPress={gotoAddJoke}><Text>Add new Joke</Text></Button>
        <Button style={styles.button} onPress={gotoMap}><Text>Map</Text></Button>
      </View>
      {
        loading ? <Loader /> :
          <ScrollView style={styles.content}>
            <Text style={styles.title}>Jokes list</Text>
            <FlatList
              contentContainerStyle={{
                marginTop: 5,
              }}
              ListEmptyComponent={() => <Loader />}
              data={dataForRender}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }: { item: IJoke }) => (
                <View><Text>{item.author}: {item.joke}</Text></View>
              )}
            />
          </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.base },
  title: { ...Typography.title, marginBottom: 24, color: '#444444' },
  button: { marginRight: 10 }
});
