// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import type {Track} from '../types'
import TrackList from '../components/TrackList'

type Props = {
  tracks: Array<Track>,
}

type State = {
}


export default class TrackSelection extends React.Component {
  props: Props;
  state: State = {
  };


  render() {
    const { tracks } = this.props;
    return (
      <View style={styles.container} keyboardShouldPersistTaps={'always'}>
        <TrackList tracks={tracks} title={`Top Tracks`} limit={20}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#2C3E50',
  },
});
