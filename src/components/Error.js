//@flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
    backgroundColor: '#D91E18',
  },

  text: {
    color: 'white',
  }
});
