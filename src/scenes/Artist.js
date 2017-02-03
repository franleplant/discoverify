// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Error from '../components/Error'

type Props = {
  router: {
    navigator: any,
    routes: any,
    params: any,
  },
}

export default class Main extends Component {
  props: Props;

  render() {
    const error = '';
    const loading = false;
    const artist = this.props.router.params;

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <Text style={{color: 'white'}}>{artist.name}</Text>

        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#2C3E50',
  },

  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#EEEEEE',
    padding: 10,
    marginRight: 10
  },

  searchButton: {
    width: 80,
    height: 40,
    backgroundColor: '#663399',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
