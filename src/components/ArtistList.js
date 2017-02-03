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
import type {Artist } from '../types'

type Props = {
  artists: Array<Artist>,
  limit?: number,
  onArtistPress: (artist: Artist) => any,
}

export default function ArtistList(props: Props) {
  const {limit = 5} = props;
  //const limit: number = props.limit || 5;

  if (props.artists.length === 0) {
    return null;
  }

  return (
    <View style={{}}>
      <Text style={styles.title}>Artists</Text>
      {props.artists.slice(0, limit).map((artist, index) => (
        <TouchableHighlight
          key={index}
          style={styles.touchableItemContainer}
          onPress={() => props.onArtistPress(artist)}
        >
          <View style={styles.itemContainer}>
            <Image style={styles.artistImage} source={{uri: artist.images[0] ? artist.images[0].url : undefined}}/>
            <Text style={{backgroundColor: 'rgba(0,0,0,0)', color: 'white', flex: 1, minWidth: 200}}>
              {artist.name}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
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
