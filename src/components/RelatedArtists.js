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
import Error from './Error'
import ArtistList from './ArtistList'

type Props = {
  artistId: string,
}

type State = {
  loading: boolean,
  error: string,
  artists: Array<Artist>,
  artistTrackMap: ArtistTrackMap,
}

export default class RelatedArtistsView extends Component {
  props: Props;
  state: State = {
    artists: [],
    artistTrackMap: {},
    loading: true,
    error: '',
  };

  componentDidMount() {
    this.fetchArtists(this.props.artistId)
  }

  fetchArtists = async (artistId: string) => {
    try {
      const res = await dal.spotify.getArtistRelatedArtists(artistId);

      let artists = []
      try {
        artists = res.body.artists;
      } catch(er) {}

      const artistTrackMap = await dal.fetchArtistsTopTracks(artists.map(a => a.id))
      this.setState(state => {
        state.artists = artists;
        state.artistTrackMap = artistTrackMap;
        state.loading = false;
        return state;
      })

    } catch (err) {
      console.log('Error fetching related artists', err)
      this.setState(state => {
        state.error = 'Something went wrong, please try again'
        state.loading = false;
        return state;
      })
    }
  }

  render() {
    const { loading, error, artists, artistTrackMap } = this.state;

    return (
      <View style={styles.container}>
        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>
        <ArtistList artists={artists} title={`Related Artists`} limit={20} topTracks={artistTrackMap}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#2C3E50',
  },


  title: {
    flex: 1,
    //minHeight: 200,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },

  artistImage: {
    flex: 1,
    backgroundColor: 'white',
    marginRight: 20,
    resizeMode: 'cover',
  },
});
