// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import Landing from './scenes/Landing'
import Main from './scenes/Main'

const ROUTES = [
  {Component: Landing, index: 'Landing'},
  {Component: Main, index: 'Main'},
]

const routes = (index: string) => {
  const res = ROUTES.find(el => el.index === index)
  if (!res) {
    throw new Error(`Route not found`);
  }

  return res;
}

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={routes('Landing')}
        renderScene={(route, navigator) => {
          const { Component } = route;
          return (
            <Component
              router={{
                navigator: navigator,
                routes: routes,
              }}
            />
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
