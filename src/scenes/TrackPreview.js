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
import Video from 'react-native-video';
import type {Artist, Album, Track, ArtistTrackMap } from '../types'
import * as dal from '../dal'
import Error from '../components/Error'
import * as appStyles from '../appStyles'

type Props = {
  track: Track,
}

type State = {
  loading: boolean,
  error: string,
  progress: {
    current: number,
    max: number,
  }
}

type TrackProgress = {
  atTimescale: number,
  atValue: number,
  currentTime: number,
  playableDuration: number,
  seekableDuration: number,
  target: number,
}


export default class TrackPreview extends Component {
  props: Props;
  state: State = {
    loading: true,
    error: '',
    progress: {
      current: 0,
      max: 30,
    }
  };

  handleLoadStart = () => {
    this.setState(state => {
      state.loading = false;
      return state;
    })
  }

  handleLoadEnd = () => {
    this.setState(state => {
      state.loading = false;
      return state;
    })
  }

  handleProgress = (progress: TrackProgress) => {
    const current = progress.currentTime;
    this.setState(state => {
      state.progress.current = current > 30 ? 30 : current;
      return state;
    })
  }

  handleEnd = () => {

  }

  handleError = () => {
    this.setState(state => {
      state.error = 'Something went wrong';
      return state;
    })
  }

  render() {
    const { loading, error, progress } = this.state;
    const {track} = this.props;

    return (
      <View style={styles.container}>

        <View style={styles.textRow}>
          <Text style={[styles.title, styles.textRowHeader]}>Name:</Text>
          <Text style={[styles.title, {flex: 1}]} numberOfLines={1}>{track.name}</Text>
        </View>

        <View style={styles.textRow}>
          <Text style={[styles.title, styles.textRowHeader]}>Album:</Text>
          <Text style={[styles.title, {flex: 1}]} numberOfLines={1}>{track.album.name}</Text>
        </View>

        <View style={styles.textRow}>
          <Text style={[styles.title, styles.textRowHeader]}>Artists:</Text>
          <Text style={[styles.title, {flex: 1}]} numberOfLines={1}>{track.artists.map(a => a.name).join(', ')}</Text>
        </View>

        <Error msg={error} />
        <ActivityIndicator animating={loading} style={{margin: 10}}/>

        <View style={styles.imageContainer}>
          <Image source={{uri: track.album.images[0].url}} style={styles.image}/>
        </View>

        <View style={{
          height: 10,
          borderWidth: 1,
          borderColor: appStyles.colors.purple,
          width: 300,
          alignSelf: 'center',
        }}>
          <View style={{
            height: 8,
            backgroundColor: appStyles.colors.purple,
            width: (progress.current / progress.max) * 300,
          }}>
          </View>

        </View>


        <Video
          source={{uri: track.preview_url}}
          rate={1.0}                     // 0 is paused, 1 is normal.
          volume={1.0}                   // 0 is muted, 1 is normal.
          muted={false}                  // Mutes the audio entirely.
          paused={false}                 // Pauses playback entirely.
          resizeMode="cover"             // Fill the whole screen at aspect ratio.
          onLoad={this.handleLoadEnd}      // Callback when video loads
          onProgress={this.handleProgress}      // Callback every ~250ms with currentTime
          onEnd={this.handleEnd}             // Callback when playback finishes
          onError={this.handleError}      // Callback when video cannot be loaded
        />

      </View>
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
    alignItems: 'center',
  },


  title: {
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

  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },

  textRowHeader: {
    marginRight: 20,
    width: 70,
  },

  imageContainer: {
    width: 300,
    height: 300,
  },

  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    marginBottom: 20,
  },

});
