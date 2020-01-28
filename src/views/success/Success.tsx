import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { NavigationStackProp } from 'react-navigation-stack';
import { Spacing, Typography, Colors, Common } from '../../styles';
type Props = {
    navigation: NavigationStackProp;
};
export function SuccessScreen({ navigation }: Props) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.message}>Your request was successfully sent</Text>
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
    subtitle: {
        ...Typography.baseText,
        color: 'white',
        width: 269,
        textAlign: 'center',
        marginTop: Spacing.small,
    },

    buttonText: { ...Typography.button, color: 'white' },
    confirmButton: {
        ...Common.rounded,
        borderColor: 'white',
        backgroundColor: Colors.green,
        width: wp(93),
    },
    message: {
        ...Typography.categoryTitle,
        width: 173,
        textAlign: 'center',
        marginTop: Spacing.large,
    },
});
