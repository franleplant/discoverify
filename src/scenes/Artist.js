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
  artist: Artist,
  tracks?: Array<Track>,
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
    const { artist, tracks } = this.props;
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
            overflow: 'hidden',
          }}
        >
          <Text style={{color: 'white', marginRight: 20, width: 60}}>Genres:</Text>
          <Text style={{color: 'white', flex: 1}} numberOfLines={1}>{artist.genres.join(', ')}</Text>
        </View>

        { tracks && tracks.length &&

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            padding: 10,
            marginTop: 10,
            backgroundColor: appStyles.colors.purple,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{color: 'white', flex:1, marginRight: 20, fontSize: 15}} onPress={() => RouterActions.TrackPreview({track: tracks[0]})}>
            Preview a song
          </Text>
          <Text style={{color: 'white', fontSize: 20, width: 30 }}>{`\u25B6`}</Text>
        </View>
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
