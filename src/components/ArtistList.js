//@flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Actions as RouterActions} from 'react-native-router-flux';
import type { Artist, Track } from '../types'
import ArtistListItem from './ArtistListItem'

type Props = {
  artists: Array<Artist>,
  topTracks?: {
    [artistId: string]: Array<Track>,
  },
  limit?: number,
  title?: string,
}

export default function ArtistList(props: Props) {
  const {limit = 5, title = 'Artists', topTracks = {}} = props;

  if (props.artists.length === 0) {
    return null;
  }

  return (
    <View style={{}}>
      <Text style={styles.title}>{title}</Text>
      {props.artists.slice(0, limit).map((artist, index) => (
        <ArtistListItem key={index} artist={artist} topTracks={topTracks[artist.id]} />
      ))}
    </View>
  )
}



const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

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
