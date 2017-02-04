//@flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ListView,
} from 'react-native';
import {Actions as RouterActions} from 'react-native-router-flux';
import type { Artist, Track, ArtistTrackMap } from '../types'
import ArtistListItem from './ArtistListItem'

type Props = {
  artists: Array<Artist>,
  topTracks?: ArtistTrackMap,
  limit?: number,
  title?: string,
}

type State = {
  dataSource: any;
}

export default class ArtistList extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    limit: 5,
    title: 'Artists',
    topTracks: {},
  };

  constructor(...args: Array<any>) {
    super(...args);
    this.initDataSource(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.artists.length !== this.props.artists.length) {
      this.initDataSource(nextProps);
    }
  }

  initDataSource(props: Props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.artists.slice(0, props.limit))
    };
  }

  render() {
    const {title, topTracks, artists} = this.props;

    if (artists.length === 0) {
      return null;
    }

    return (
      <View style={{}}>
        <Text style={styles.title}>{title}</Text>
        <ListView
          keyboardShouldPersistTaps={'always'}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(artist) => (
            <ArtistListItem artist={artist} topTracks={topTracks ? topTracks[artist.id] : []} />
          )}
        />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  container: {
    //flex: 1,
    padding: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D91E18',
  },

  text: {
    color: 'white',
  }
});
