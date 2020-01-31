import React, { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useMutation } from "@apollo/react-hooks";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Surface, TextInput } from 'react-native-paper';
import { RootRoutes } from '../../common/constants/routes';
import { Buttons, Common, Spacing, Typography } from '../../styles';
import { ADD_JOKE } from "../../graphql/mutations/jokes.mutations";
import { GET_JOKES } from "../../graphql/queries/jokes.queries";

type Props = {
  navigation: NavigationStackProp;
};

export function AddJokeScreen(props: Props) {
  const { navigation } = props;

  const [joke, setJoke] = useState<string>();
  const [addJoke, { loading: mutationLoading }] = useMutation(ADD_JOKE, {
    refetchQueries: [{ query: GET_JOKES }]
  });

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
      contentContainerStyle={styles.container}
    >
      <Text style={[{ ...Spacing.loginOrgMessageMargin }]}>Add new Joke</Text>
      <Surface style={styles.loginCard}>
        <TextInput
          style={{ width: '100%', marginTop: Spacing.base }}
          theme={{ colors: { primary: 'grey' } }}
          label='Joke content'
          mode='outlined'
          onSubmitEditing={goAddJoke}
          value={joke}
          onChangeText={(text: string) => setJoke(text)}
        />
        <Button
          uppercase={false}
          style={styles.addButton}
          mode='contained'
          onPress={goAddJoke}
        >
          <Text style={styles.addButtonText}>add...</Text>
        </Button>
      </Surface>
    </KeyboardAwareScrollView>
  );

  async function goAddJoke(): Promise<void> {
    if (joke) {
      try {
        addJoke({ variables: { joke } });
        setJoke("");
        navigation.navigate(RootRoutes.JokeList);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  loginCard: {
    marginTop: Spacing.base,
    width: wp(91),
    elevation: 10,
    ...Common.rounded,
    ...Spacing.horizontalPadding,
  },
  addButton: {
    marginTop: hp(2),
    marginBottom: 15,
    ...Buttons.base,
  },
  addButtonText: { ...Typography.lightButton },
});
