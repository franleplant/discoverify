// @flow
import React, { Component } from 'react';
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
import type {Artist, Album, Track } from '../types'
import routes from '../routes'
import spotify from '../spotify'
import Error from '../components/Error'
import ArtistList from '../components/ArtistList'

type Props = {
  router: {
    navigator: any,
    routes: any,
    params: any,
  },
}

type State = {
  loading: boolean;
  error: string;
  results: SearchResults;
  fields: {
    searchTerm: string;
  }
}

type SearchResultItem<T> = {
  href: string,
  items: Array<T>,
  limit: number,
  next: string,
  previous: string,
  offset: number,
}

type SearchResults = {
  albums: ?SearchResultItem<Album>,
  artist: ?SearchResultItem<Artist>,
  tracks: ?SearchResultItem<Tracks>,
}


export default class Landing extends Component {
  props: Props;
  state: State = {
    loading: false,
    error: '',
    results: {},
    fields: {
      searchTerm: '',
    }
  };

  handleSearch = async () => {
    const searchTerm = this.state.fields.searchTerm;

    this.setState(state => {
      state.loading = true;
      state.results = {};
      return state;
    });


    try {
      const data = await spotify.search(searchTerm, ['album', 'artist', 'track'])
      console.log(data.body)
      this.setState(state => {
        state.loading = false;
        state.results = data.body;
        return state;
      });

    } catch (err) {
       console.log('Something went wrong!', err);
        this.setState(state => {
          state.loading = false;
          state.error = 'Something went wrong, please try again';
          return state;
        });
    }
  }

  handleChange = (fieldName: string, value: string) => {
    this.setState(state => {
      state.fields[fieldName] = value;
      return state;
    })
  }

  handleArtistPress = (artist: Artist) => {
    this.props.router.navigator.push(routes('Artist', artist))
  }

  render() {
    const {loading, error, fields, results} = this.state;
    const noResults = (!results.artists && !results.albums && !results.tracks)

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={'Search for Artists, Albums and Songs'}
            value={fields.searchTerm}
            onChangeText={this.handleChange.bind(null, 'searchTerm')}
            style={styles.searchInput}
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
          <Text style={{color: 'white'}}>
          Search for Artists, Albums and Tracks and tap them to see
          more content like it.
          </Text>
        }

        <ArtistList artists={results.artists ? results.artists.items : []} onArtistPress={this.handleArtistPress}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#2C3E50',
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
    backgroundColor: '#663399',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
