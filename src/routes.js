import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';

import * as appStyles from './appStyles'

import Landing from './scenes/Landing'
import Artist from './scenes/Artist'
import TrackPreview from './scenes/TrackPreview'


const scenes = Actions.create(
  <Scene key="root">
    <Scene initial={true} key="Landing" component={Landing} title="Landing" hideNavBar={true} navigationBarStyle={appStyles.navbar} titleStyle={appStyles.navbarTitle}/>
    <Scene key="Artist" component={Artist} title="Artist" hideNavBar={false} navigationBarStyle={appStyles.navbar} titleStyle={appStyles.navbarTitle}/>
    <Scene key="TrackPreview" component={TrackPreview} title="Track Preview" hideNavBar={false} navigationBarStyle={appStyles.navbar} titleStyle={appStyles.navbarTitle}/>
  </Scene>
);

export default scenes;
