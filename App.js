import React, { useState, useEffect } from 'react';
import {
SafeAreaView,
StyleSheet,
ScrollView,
View,
Text,
StatusBar,
TouchableOpacity,
} from 'react-native';
import { Scene, Router, Stack, Tabs, Actions, ActionConst } from 'react-native-router-flux';
import Init from './src/views/Init';
import Home from './src/views/Home';
import Animation1 from './src/views/Animation1';
import Animation2 from './src/views/Animation2';
import Animation3 from './src/views/Animation3';
import Animation4 from './src/views/Animation4';
import Animation5 from './src/views/Animation5';
import gqlEx from './src/views/graphqlEx';
const App = () => {
  const [loading,setLoading] = useState(false);
  return (
    <Router>
      <Stack>
        <Scene key="init" component={Init} hideNavBar={true} title="Inicio" initial={true}/>
        <Scene key="home" component={Home} hideNavBar={true} title="Home" initial={false}/>
        <Scene key="a1" component={Animation1} hideNavBar={true} title="A1" initial={false}/>
        <Scene key="a2" component={Animation2} hideNavBar={true} title="A2" initial={false}/>
        <Scene key="a3" component={Animation3} hideNavBar={true} title="A3" initial={false}/>
        <Scene key="a4" component={Animation4} hideNavBar={true} title="A4" initial={false}/>
        <Scene key="a5" component={Animation5} hideNavBar={true} title="A5" initial={false}/>
        <Scene key="gqlex" component={gqlEx} hideNavBar={true} title="Gqlex" initial={false}/>

      </Stack>
    </Router>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    height: 40,
    borderTopWidth: 0,
    opacity: 0.98,

  },
  tabBarText: {
    fontSize:10,
  },

});

export default App;
