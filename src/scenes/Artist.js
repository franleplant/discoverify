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
import * as appStyles from '../appStyles'

type Props = {
  artistId: string,
  artist?: Artist,
  tracks?: Array<Track>,
}

type State = {
  loading: boolean,
  error: string,
  artist: ?Artist,
  tracks: Array<Track>,
}


export default class ArtistView extends Component {
  static defaultProps = {
    tracks: [],
  }

  props: Props;
  state: State = {
    artist: null,
    tracks: [],
    loading: false,
    error: '',
  };


  componentDidMount() {
    this.fetchArtistIfNecessary(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.fetchArtistIfNecessary(nextProps);
  }

  async fetchArtistIfNecessary(props: Props) {
    if (props.artist) {
      this.setState(state => {
        state.artist = props.artist;
        state.tracks = props.tracks;
        return state
      })
      return;
    }

    this.setState(state => {
      state.loading = true;
      return state
    })

    try {
      const [artistResponse, tracksResponse ] = await Promise.all([
        dal.spotify.getArtist(props.artistId),
        dal.spotify.getArtistTopTracks(props.artistId, 'Ar'),
      ])


      this.setState(state => {
        state.loading = false;
        state.artist = artistResponse.body;
        state.tracks = tracksResponse.body.tracks;
        return state
      })

    } catch (err) {
      console.log(`Error fetching artist`, err);
      this.setState(state => {
        state.loading = false;
        state.error = 'Something went wrong, please try again';
        return state
      })
    }
  }

  render() {
    const { artistId } = this.props;
    const { loading, error, artist, tracks } = this.state;

    if (!artist) {
      return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
          <Error msg={error} />
          <ActivityIndicator animating={loading} style={{margin: 10}}/>
        </ScrollView>
      )
    }

    const images = artist.images;
    const image = images[0] ? images[0].url : undefined

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>

        <View style={styles.artistBanner}>
          <View style={styles.artistImageContainer}>
            <Image style={styles.artistImage} source={{uri: image}}/>
          </View>
          <Text style={styles.title}>{artist.name}</Text>
        </View>

        <View style={styles.genresContainer}>
          <Text style={{color: 'white', width: 60}}>Genres:</Text>
          <Text style={{color: 'white', flex: 1}} numberOfLines={2}>{artist.genres.join(', ')}</Text>
        </View>

        { tracks.length !== 0 &&
        <TouchableHighlight style={styles.trackPreviewTouchable} onPress={() => RouterActions.TrackSelection({tracks})}>
          <View style={styles.trackPreviewContainer}>
            <Text style={{color: 'white', flex:1, marginRight: 20, fontSize: 15}}>
              Preview a song
            </Text>
            <Text style={{color: 'white', fontSize: 20, width: 30 }}>{`\u25B6`}</Text>
          </View>
        </TouchableHighlight>
        }


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

  artistBanner: {
    flexDirection: 'row',
    minHeight: 200,
    marginBottom: 20,
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

  genresContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },


  trackPreviewContainer: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trackPreviewTouchable: {
    height: 40,
    padding: 10,
    marginTop: 10,
    backgroundColor: appStyles.colors.purple,
  }

});
