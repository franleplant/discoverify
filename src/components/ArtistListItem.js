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

type Props = {
  artist: Artist,
  topTracks?: Array<Track>,
}

export default function ArtistListItem(props: Props) {
  const { artist, topTracks } = props;
  let trackPreview = null;
  if (topTracks) {
    trackPreview = (
      <Text style={{width: 50, color: 'white', fontSize: 20, textAlign: 'right'}} onPress={() => RouterActions.TrackPreview({track: topTracks[0]})}>
        {`\u25B6`}
      </Text>
    )
  }
  return (
    <TouchableHighlight
      style={styles.touchableItemContainer}
      onPress={() => RouterActions.Artist({artistId: artist.id, artist, tracks: topTracks})}
    >
      <View style={styles.itemContainer}>
        <Image style={styles.artistImage} source={{uri: artist.images[0] ? artist.images[0].url : undefined}}/>
        <Text style={styles.itemText}>
          {artist.name}
        </Text>
        {trackPreview}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  touchableItemContainer: {
    borderWidth: 1,
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    flex: 1,
    minWidth: 200,
  },

  artistImage: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    marginRight: 20
  },
});
