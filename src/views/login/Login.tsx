import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Surface, TextInput } from 'react-native-paper';
import { RootRoutes } from '../../common/constants/routes';
import { Buttons, Common, Spacing, Typography } from '../../styles';

type Props = {
    navigation: NavigationStackProp;
};

export function LoginScreen(props: Props) {
    const { navigation } = props;

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            contentContainerStyle={styles.container}
        >
            <Text style={[{ ...Spacing.loginOrgMessageMargin }]}>
                Login with email
                </Text>
            <Surface style={styles.loginCard}>
                <TextInput
                    style={{ width: '100%', marginTop: Spacing.base }}
                    theme={{ colors: { primary: 'grey' } }}
                    label='Email'
                    mode='outlined'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    onSubmitEditing={() => login()}
                    value={email}
                    onChangeText={(text: string) => setEmail(text)}
                />
                <TextInput
                    style={{ width: '100%', marginTop: Spacing.base }}
                    theme={{ colors: { primary: 'grey' } }}
                    secureTextEntry={true}
                    label='Password'
                    mode='outlined'
                    onSubmitEditing={() => (login())}
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                />
                <Button
                    uppercase={false}
                    style={styles.continueButton}
                    mode='contained'
                    onPress={() => (login())}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </Button>
            </Surface>
        </KeyboardAwareScrollView>
    );

    async function login(): Promise<void> {
        if (email) {
            await setUser({ accessToken: '123', userId: email });
            navigation.navigate(RootRoutes.Home);
        } else {
            await AsyncStorage.clear();
        }
    }

    async function setUser({ accessToken, userId }: { accessToken: string; userId: string }): Promise<void> {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('email', userId);
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
