import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Spacing } from '../../styles';

export function Loader() {
    return (
        <View style={style.wrapper}>
            <Text>Loading...</Text>
        </View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        ...Spacing.wrapper,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
