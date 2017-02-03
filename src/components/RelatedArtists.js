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
import type {Artist, Album, Track } from '../types'
import spotify from '../spotify'
import Error from './Error'
import ArtistList from './ArtistList'

type Props = {
  artistId: string,
}

type State = {
  loading: boolean,
  error: string,
  data: Array<Artist>,
}

export default class RelatedArtistsView extends Component {
  props: Props;
  state: State = {
    data: [],
    loading: true,
    error: '',
  };

  constructor(...args: Array<any>) {
    super(...args);
  }

  componentDidMount() {
    this.fetchData(this.props.artistId)
  }

  fetchData = async (artistId: string) => {
    try {
      const res = await spotify.getArtistRelatedArtists(artistId);
      this.setState(state => {
        state.data = res.body.artists;
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
    const { loading, error, data } = this.state;

    return (
      <View style={styles.container}>

        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>

        <ArtistList artists={data} title={`Related Artists`} limit={20}/>
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
