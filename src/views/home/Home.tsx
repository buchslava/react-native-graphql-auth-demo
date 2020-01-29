import React, { useEffect, useState } from 'react';
import { AsyncStorage, Text, View, Button } from 'react-native';
import { Typography } from '../../styles';
import { AuthRoutes } from '../../common/constants/routes';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
    navigation: NavigationStackProp;
};

export function HomeScreen({ navigation }: Props) {
    const logOut = async () => {
        await AsyncStorage.clear();
        navigation.navigate(AuthRoutes.Login);
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20, ...Typography.regular }}>Hello!</Text>
            <Button title={'Logout'} onPress={() => (logOut())}><Text>Logout</Text></Button>
        </View>
    );
}
