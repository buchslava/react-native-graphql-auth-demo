import React, { useEffect, useState } from 'react';
import { AsyncStorage, Text, View, Button } from 'react-native';
import { Typography } from '../../styles';
import { AuthRoutes } from '../../common/constants/routes';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
    navigation: NavigationStackProp;
};

export function HomeScreen({ navigation }: Props) {
    const [email, setEmail] = useState<string>('foo');
    useEffect(() => {
        bootstrapAsync();
    }, []);

    async function bootstrapAsync() {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const email = await AsyncStorage.getItem('email');
        if (accessToken && email) {
            setEmail(email);
        } else {
            navigation.navigate(AuthRoutes.Login);
        }
    }

    const logOut = async () => {
        await clearUser();
        navigation.navigate(AuthRoutes.Login);
    };

    const clearUser = async () => {
        await AsyncStorage.clear();
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 20, ...Typography.regular }}>Hello, {email}!</Text>
            <Button title={'Logout'} onPress={() => (logOut())}><Text>Logout</Text></Button>
        </View>
    );
}
