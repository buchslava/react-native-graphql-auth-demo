import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from "@apollo/react-hooks";
import { RootRoutes, AuthRoutes } from '../../common/constants/routes';
import { NavigationStackProp } from 'react-navigation-stack';
import { CHECK_LOGGED_STATUS } from "../../graphql/local";
import { Spacing } from '../../styles';

type Props = {
    navigation: NavigationStackProp;
};
export function LoadingScreen({ navigation }: Props) {
    const { loading, data } = useQuery(CHECK_LOGGED_STATUS);

    useEffect(() => {
        if (!loading) {
            if (data.isLoggedIn) {
                navigation.navigate(RootRoutes.JokeList);
            } else {
                navigation.navigate(AuthRoutes.Login);
            }
        }
    }, [loading, data]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.message}>Loading...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: Spacing.wrapper,
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        width: 173,
        textAlign: 'center',
        marginTop: Spacing.large,
    },
});
