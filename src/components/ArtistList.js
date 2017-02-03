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
      {props.artists.slice(0, limit).map((artist, index) => {
        let trackPreview = null;
        let artistTopTracks = topTracks[artist.id]
        if (artistTopTracks) {
          trackPreview = (
            <Text style={{width: 30}}>Play</Text>
          )
        }
        return (
          <TouchableHighlight
            key={index}
            style={styles.touchableItemContainer}
            onPress={() => RouterActions.Artist({artist})}
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
      })}
    </View>
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

  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  artistImage: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    marginRight: 20
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
