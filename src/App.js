// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux'
import routes from './routes';
import createStore from './store/createStore';


const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router scenes={routes}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
