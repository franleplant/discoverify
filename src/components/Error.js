//@flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as appStyles from '../appStyles'

type Props = {
  msg: string,
}

export default function Error(props: Props) {
  if (!props.msg) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Error: ${props.msg}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appStyles.colors.red,
  },

  text: {
    color: 'white',
  }
});
