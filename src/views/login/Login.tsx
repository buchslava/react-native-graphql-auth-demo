import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, Alert } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Surface, TextInput } from 'react-native-paper';
import { useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from "../../graphql/mutations/auth.mutations";
import { LOG_IN } from "../../graphql/local";
import { RootRoutes, AuthRoutes } from '../../common/constants/routes';
import { Buttons, Common, Spacing, Typography } from '../../styles';

type Props = {
    navigation: NavigationStackProp;
};

export function LoginScreen(props: Props) {
    const { navigation } = props;

    const [signIn, { data }] = useMutation(SIGN_IN);
    const [changeStatus] = useMutation(LOG_IN);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const getRecord = (data: any) => {
        const {
            auth: {
                signIn: { record }
            }
        } = data;
        return record;
    };

    useEffect(() => {
        if (data && email) {
            const record = getRecord(data);
            if (record) {
                AsyncStorage.setItem("accessToken", record.accessToken);
                AsyncStorage.setItem('email', email);
                changeStatus({
                    variables: {
                        status: true
                    }
                });
                navigation.navigate(RootRoutes.JokeList);
            } else {
                Alert.alert("Wrong password");
                navigation.navigate(AuthRoutes.Login);
            }
        }
    }, [data]);

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            contentContainerStyle={styles.container}
        >
            <Text style={[{ ...Spacing.loginOrgMessageMargin }]}>Login with email</Text>
            <Surface style={styles.loginCard}>
                <TextInput
                    style={{ width: '100%', marginTop: Spacing.base }}
                    theme={{ colors: { primary: 'grey' } }}
                    label='Email'
                    mode='outlined'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    onSubmitEditing={login}
                    value={email}
                    onChangeText={(text: string) => setEmail(text)}
                />
                <TextInput
                    style={{ width: '100%', marginTop: Spacing.base }}
                    theme={{ colors: { primary: 'grey' } }}
                    secureTextEntry={true}
                    label='Password'
                    mode='outlined'
                    onSubmitEditing={login}
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                />
                <Button
                    uppercase={false}
                    style={styles.continueButton}
                    mode='contained'
                    onPress={login}
                >
                    <Text style={styles.continueButtonText}>Log In</Text>
                </Button>
                <Button
                    uppercase={false}
                    style={styles.continueButton}
                    mode='contained'
                    onPress={() => (navigation.navigate(AuthRoutes.Register))}
                >
                    <Text style={styles.continueButtonText}>Registration</Text>
                </Button>
            </Surface>
        </KeyboardAwareScrollView>
    );

    async function login(): Promise<void> {
        if (email) {
            signIn({ variables: { login: email, password } });
        } else {
            await AsyncStorage.clear();
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
    continueButton: {
        marginTop: hp(2),
        marginBottom: 15,
        ...Buttons.base,
    },
    continueButtonText: { ...Typography.lightButton },
});
