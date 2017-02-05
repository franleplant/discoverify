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
import type { Album } from '../types'
import AlbumListItem from './AlbumListItem'

type Props = {
  albums: Array<Album>,
  limit?: number,
  title?: string,
}

type State = {
  dataSource: any;
}

export default class AlbumList extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    limit: 5,
    title: 'Albums',
    albums: [],
  };

  constructor(...args: Array<any>) {
    super(...args);
    this.initDataSource(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.albums.length !== this.props.albums.length) {
      this.initDataSource(nextProps);
    }
  }

  initDataSource(props: Props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.albums.slice(0, props.limit))
    };
  }

  render() {
    const {title, albums} = this.props;

    if (albums.length === 0) {
      return null;
    }

    return (
      <View style={{}}>
        <Text style={styles.title}>{title}</Text>
        <ListView
          keyboardShouldPersistTaps={'always'}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={album => <AlbumListItem album={album}/>}
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
