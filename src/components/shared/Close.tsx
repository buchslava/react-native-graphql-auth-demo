import * as React from 'react';
import { IconButton } from 'react-native-paper';

export const Close = ({ onPress }: { onPress: Function }) => {
    return <IconButton icon='close' onPress={() => onPress()} color='white' />;
};
