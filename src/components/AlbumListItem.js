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
import type { Artist, Album } from '../types'

type Props = {
  album: Album,
}

export default function AlbumListItem(props: Props) {
  const { album } = props;

  let image;
  try {
    image = album.images[0].url
  } catch (err) {}

  const artist = album.artists[0];

  return (
    <TouchableHighlight
      style={styles.touchableItemContainer}
      onPress={() => RouterActions.Artist({artistId: artist.id})}
    >
      <View style={styles.itemContainer}>
        <View style={styles.artistImageContainer}>
          <Image style={styles.artistImage} source={{uri: image}}/>
        </View>
        <Text style={styles.itemText} numberOfLines={2}>
          {`${album.name} by ${artist.name}`}
        </Text>
        {/*
        <Text style={{width: 50, color: 'white', fontSize: 20, textAlign: 'right'}} onPress={() => RouterActions.TrackPreview({track: track})}>
          {`\u25B6`}
        </Text>
        */}
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
    alignItems: 'center',
  },

  itemText: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    flex: 1,
    minWidth: 200,
  },

  artistImageContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    marginRight: 20
  },

  artistImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
