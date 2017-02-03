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
                params: route.params,
              }}
            />
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
