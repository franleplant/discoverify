// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import routes from './routes';

import {Actions, Scene, Router} from 'react-native-router-flux';


export default class App extends Component {
  render() {
    return (
      <Router scenes={routes}/>
    );
  }
}

const styles = StyleSheet.create({});
