// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as appStyles from '../appStyles'
import type { AppState, Artist, Album, Track, ArtistTrackMap } from '../types'
import * as dal from '../dal'
import Error from '../components/Error'
import ArtistList from '../components/ArtistList'
import TrackList from '../components/TrackList'
import AlbumList from '../components/AlbumList'
import * as actions from '../store/actions/search';
import * as selectors from '../store/reducers/search';
import * as topTracksSelectors from '../store/reducers/artistTopTracks';

type OwnProps = { }

type ReduxStateProps = {
  loading: boolean,
  error: string,
  artists: Array<Artist>,
  tracks: Array<Track>,
  albums: Array<Album>,
  artistTopTrackMap: ArtistTrackMap,
};
function mapStateToProps(state: AppState, ownProps: OwnProps): ReduxStateProps {
  return {
    loading: state.search.loading,
    error: state.search.error,
    artists: selectors.getArtists(state),
    tracks: selectors.getTracks(state),
    albums: selectors.getAlbums(state),
    artistTopTrackMap: topTracksSelectors.getAllTracksByArtist(state)
  }
}

type ReduxDispatchProps = {
  search: (searchTerm: string) => any,
}
function mapDispatchToProps(dispatch: any): ReduxDispatchProps {
  return {
    search: (searchTerm: string) => dispatch(actions.search(searchTerm)),
  };
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

type State = {
  fields: {
    searchTerm: string;
  }
}
export class Landing extends Component {
  props: Props;
  state: State = {
    fields: {
      searchTerm: '',
    }
  };

  handleSearch = () => {
    const searchTerm = this.state.fields.searchTerm;
    this.props.search(searchTerm);
  }

  handleChange = (fieldName: string, value: string) => {
    this.setState(state => {
      state.fields[fieldName] = value;
      return state;
    })
  }

  render() {
    const { loading, error, artists, tracks, albums, artistTopTrackMap } = this.props;
    const { fields } = this.state;

    const noResults = (!loading && !artists.length && !albums.length && !tracks.length)

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={'Search for Artists, Albums and Songs'}
            value={fields.searchTerm}
            onChangeText={this.handleChange.bind(null, 'searchTerm')}
            style={styles.searchInput}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            onSubmitEditing={this.handleSearch}
          />

          <TouchableHighlight onPress={this.handleSearch} style={styles.searchButton}>
            <View>
              <Text style={{color: 'white'}}>Search</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>

        { noResults &&
          <Text style={{color: 'white', width: 200, fontSize: 18, marginTop: 100, textAlign: 'center', alignSelf: 'center'}}>
          Search for Artists, Albums and Tracks and tap them to see
          more content like it.
          </Text>
        }

        { !loading &&
          <View>
            <ArtistList artists={artists} topTracks={artistTopTrackMap}/>
            <View style={{height: 20}}></View>
            <TrackList tracks={tracks} />
            <View style={{height: 20}}></View>
            <AlbumList albums={albums} />
          </View>
        }

      </ScrollView>
    );
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Landing);
export default ConnectedComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: appStyles.colors.darkBlue,
  },

  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#EEEEEE',
    padding: 10,
    marginRight: 10
  },

  searchButton: {
    width: 80,
    height: 40,
    backgroundColor: appStyles.colors.purple,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
