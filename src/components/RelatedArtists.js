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
} from 'react-native';
import {Actions as RouterActions} from 'react-native-router-flux';
import type { AppState, Artist, Album, Track, ArtistTrackMap } from '../types';
import Error from './Error';
import ArtistList from './ArtistList';
import * as actions from '../store/actions/relatedArtists';
import * as selectors from '../store/reducers/relatedArtists';
import * as topTracksSelectors from '../store/reducers/artistTopTracks';



type OwnProps = {
  artistId: string,
}

type ReduxStateProps = {
  loading: boolean,
  error: string,
  artists: Array<Artist>,
  artistTrackMap: ArtistTrackMap,
};

function mapStateToProps(state: AppState, ownProps: OwnProps): ReduxStateProps {
  return {
    loading: state.relatedArtists.loading || state.artistTopTracks.loading,
    error: state.artists.error || state.artistTopTracks.error,
    artists: selectors.getRelatedArtists(state, ownProps.artistId),
    artistTrackMap: topTracksSelectors.getAllTracksByArtist(state)
  }
}

type ReduxDispatchProps = {
  fetchArtistsAndTracks: (artistId: string) => any,
}
function mapDispatchToProps(dispatch: any): ReduxDispatchProps {
  return {
    fetchArtistsAndTracks: (artistId: string) => dispatch(actions.fetchRelatedArtistsAndTopTracks(artistId)),
  };
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;
type State = {}

export class RelatedArtistsView extends Component {
  props: Props;
  state: State = {};

  componentDidMount() {
    //Little hack to avoid frame dropping on transitions
    //This is a well known problem of the router Im using
    setTimeout(() => {
      this.props.fetchArtistsAndTracks(this.props.artistId);
    }, 500);
  }

  render() {
    const { loading, error, artists, artistTrackMap } = this.props;

    return (
      <View style={styles.container}>
        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>
        { !loading &&
          <ArtistList artists={artists} title={`Related Artists`} limit={20} topTracks={artistTrackMap}/>
        }
      </View>
    );
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RelatedArtistsView);
export default ConnectedComponent;

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
