import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
};

export function MapScreen(props: Props) {
  const { navigation } = props;

  return (
    <View>
      <Text>foo</Text>
    </View>
  );
}
