import React, { useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import { RegisterSchema, validate, passwordsEquals } from "../../common/utils/validation";
import { NavigationStackProp } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button, Surface, TextInput } from 'react-native-paper';
import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../../graphql/mutations/auth.mutations";
import { RootRoutes, AuthRoutes } from '../../common/constants/routes';
import { Buttons, Common, Spacing, Typography } from '../../styles';

type Props = {
    navigation: NavigationStackProp;
};

export interface RegisterData {
    email: string;
    password: string;
    passwordRepeat: string;
}

export function RegisterScreen(props: Props) {
    const { navigation } = props;
    const [signUp, { data }] = useMutation(SIGN_UP);
    const getRecord = (data: any) => {
        const {
            auth: {
                signUp: { record }
            }
        } = data;
        return record;
    };

    useEffect(() => {
        if (data) {
            const record = getRecord(data);
            if (record) {
                AsyncStorage.setItem("accessToken", record.accessToken);
                navigation.navigate(RootRoutes.JokeList);
            } else {
                Alert.alert("Such user exists. Change your login");
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
            <Text style={[{ ...Spacing.loginOrgMessageMargin }]}>Registration</Text>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    passwordRepeat: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={submit}
            >
                {({ handleChange, handleSubmit, values, validateForm, errors, touched }) => (
                    <>
                        <Surface style={styles.loginCard}>
                            <TextInput
                                style={{ width: '100%', marginTop: Spacing.base }}
                                theme={{ colors: { primary: 'grey' } }}
                                label='Email'
                                mode='outlined'
                                autoCompleteType='email'
                                keyboardType='email-address'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                error={validate(touched.email, errors.email)}
                            />
                            <TextInput
                                style={{ width: '100%', marginTop: Spacing.base }}
                                theme={{ colors: { primary: 'grey' } }}
                                secureTextEntry={true}
                                label='Password'
                                mode='outlined'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                error={validate(touched.password, errors.password)}
                            />
                            <TextInput
                                style={{ width: '100%', marginTop: Spacing.base }}
                                theme={{ colors: { primary: 'grey' } }}
                                secureTextEntry={true}
                                label='Repeat password'
                                mode='outlined'
                                value={values.passwordRepeat}
                                onChangeText={handleChange('passwordRepeat')}
                                error={validate(touched.passwordRepeat, errors.passwordRepeat)}
                            />

                            <Button
                                uppercase={false}
                                style={styles.continueButton}
                                mode='contained'
                                onPress={() => {
                                    validateForm();
                                    handleSubmit();
                                }}
                            >
                                <Text style={styles.continueButtonText}>Register</Text>
                            </Button>
                            <Button
                                uppercase={false}
                                style={styles.continueButton}
                                mode='contained'
                                onPress={() => {
                                    navigation.navigate(AuthRoutes.Login)
                                }}
                            >
                                <Text style={styles.continueButtonText}>Back</Text>
                            </Button>
                        </Surface>
                    </>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );

    async function submit(values: RegisterData): Promise<void> {
        if (passwordsEquals(values)) {
            signUp({ variables: { login: values.email, password: values.password } });
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
