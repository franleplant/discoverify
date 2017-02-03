import {Actions} from 'react-native-router-flux';

import Landing from './scenes/Landing'
import Artist from './scenes/Artist'


const scenes = Actions.create(
  <Scene key="root">
    <Scene initial={true} key="Landing" component={Landing} title="Landing"/>
    <Scene key="Artist" component={Artist} title="Artist"/>
  </Scene>
);

export default scenes;
