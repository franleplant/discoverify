// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {Actions as RouterActions} from 'react-native-router-flux';
import type {Artist, Album, Track, ArtistTrackMap, AppState } from '../types'
import Error from '../components/Error'
import RelatedArtists from '../components/RelatedArtists'
import * as appStyles from '../appStyles'
import * as actions from '../store/actions/artists';
import * as selectors from '../store/reducers/artists';
import * as topTracksActions from '../store/actions/artistTopTracks'
import * as topTracksSelectors from '../store/reducers/artistTopTracks'

type OwnProps = {
  artistId: string,
}

type ReduxStateProps = {
  loading: boolean,
  error: string,
  artist: Artist,
  tracks: Array<Track>,
};
function mapStateToProps(state: AppState, ownProps: OwnProps): ReduxStateProps {
  return {
    loading: state.artists.loading,
    error: state.artists.error || state.artistTopTracks.error,
    artist: selectors.getArtist(state, ownProps.artistId),
    tracks: topTracksSelectors.getArtistTracks(state, ownProps.artistId),
  }
}

type ReduxDispatchProps = {
  fetchArtist: (artistId: string) => any,
  fetchTopTracks: (artistId: string) => any,
}
function mapDispatchToProps(dispatch: any): ReduxDispatchProps {
  return {
    fetchArtist: (artistId: string) => dispatch(actions.fetchArtist(artistId)),
    fetchTopTracks: (artistId: string) => dispatch(topTracksActions.fetchArtistTopTracks(artistId)),
  };
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

type State = {
}


export class ArtistView extends Component {
  static defaultProps = {
    tracks: [],
  }

  props: Props;
  state: State = {};


  componentDidMount() {
    const props = this.props;
    this.props.fetchArtist(props.artistId);
    this.props.fetchTopTracks(props.artistId);
  }

  render() {
    const { artistId, loading, error, artist, tracks } = this.props;

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

        { Platform.OS === 'android' &&
          <View style={{height: 100}} />
        }
      </ScrollView>
    );
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ArtistView);
export default ConnectedComponent;

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
