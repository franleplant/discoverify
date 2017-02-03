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
import {Actions as RouterActions} from 'react-native-router-flux';
import type {Artist, Album, Track, ArtistTrackMap } from '../types'
import * as dal from '../dal'
import Error from '../components/Error'
import RelatedArtists from '../components/RelatedArtists'

type Props = {
  artist: Artist,
}

type State = {
  loading: boolean,
  error: string,
}


export default class ArtistView extends Component {
  props: Props;
  state: State = {
    relatedArtists: {artists: []},
    artistTrackMap: {},
    loading: false,
    error: '',
  };

  render() {
    const { loading, error } = this.state;
    const artist = this.props.artist;
    const artistId = artist.id;
    const images = artist.images;
    const imageSource = { uri: images[0] ? artist.images[0].url : undefined }

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>

        <View style={{
          flexDirection: 'row',
          minHeight: 200,
          marginBottom: 20,
        }}>

          <View style={styles.artistImageContainer}>
            <Image style={styles.artistImage} source={imageSource}/>
          </View>
          <Text style={styles.title}>{artist.name}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={{color: 'white', marginRight: 20}}>Genres:</Text>
          <Text style={{color: 'white'}}>{artist.genres.join(', ')}</Text>
        </View>


        <RelatedArtists artistId={artistId}/>


      </ScrollView>
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


  title: {
    flex: 1,
    //minHeight: 200,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },

  artistImageContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    marginRight: 20,
  },
  artistImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    resizeMode: 'cover',
  },

});
