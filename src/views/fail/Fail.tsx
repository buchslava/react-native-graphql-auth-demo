import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationStackProp } from 'react-navigation-stack';
import { Colors, Common, Spacing, Typography } from '../../styles';

type Props = {
    // tslint:disable-next-line: no-any
    navigation: NavigationStackProp<{
        text?: string;
        retryRoute?: string;
        okRoute?: string;
        // tslint:disable-next-line: no-any
        body?: any;
        url?: string;
        // tslint:disable-next-line: no-any
        user?: any;
    }>;
};
export function FailScreen({ navigation }: Props) {

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.message}>No connection</Text>
                <Button
                    uppercase={false}
                    theme={{ colors: { primary: '#0d841a' } }}
                    style={styles.retryButton}
                    mode='outlined'
                    onPress={() =>
                        navigation.getParam('retryRoute')
                            ? navigation.navigate(navigation.getParam('retryRoute'))
                            : navigation.goBack()
                    }
                >
                    <Text style={styles.buttonText}>Retry</Text>
                </Button>
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
        width: 156,
    },
    retryButton: {
        ...Common.rounded,
        borderColor: Colors.green,
        width: 156,
    },
    message: {
        ...Typography.categoryTitle,
        width: 173,
        textAlign: 'center',
        marginTop: Spacing.large,
    },
});
