import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';

import Landing from './scenes/Landing'
import Artist from './scenes/Artist'


const scenes = Actions.create(
  <Scene key="root">
    <Scene initial={true} key="Landing" component={Landing} title="Landing" hideNavBar={true}/>
    <Scene key="Artist" component={Artist} title="Artist" hideNavBar={false}/>
  </Scene>
);

export default scenes;
