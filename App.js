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
import AsyncStorage from '@react-native-community/async-storage';
import { Scene, Router, Stack, Tabs, Actions, ActionConst } from 'react-native-router-flux';
import Init from './src/views/Init';
import Home from './src/views/Home';
import Animation1 from './src/views/Animation1';
import Animation2 from './src/views/Animation2';
import Animation3 from './src/views/Animation3';
import Animation4 from './src/views/Animation4';
import Animation5 from './src/views/Animation5';
import AnimatedHome from './src/views/AnimatedHome';
import gqlEx from './src/views/graphqlEx';
import gqlAdd from './src/views/graphqlAdd';
import jwtDecoder from 'jwt-decode';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from '@apollo/client/link/context';


import { ApolloProvider, ApolloLink, ApolloClient } from '@apollo/client';
import makeApolloClient from './src/utils/apollo'
const login = (email, password, token) => {
  fetch(
    'https://hasura.io/learn/auth/login',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password
      })
    }
  )
  .then(resp => {
    resp.json()
    .then(respObj => {
      
      if (resp.status === 200) {
        token(respObj);
        return;
      }
    })}
  )
  .catch(err => {
    console.log(err);
  })
};

const link = ApolloLink.from([createHttpLink({uri:'https://hasura.io/learn/graphql', headers:{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrZXZpbmVtdW5vejk3QGdtYWlsLmNvbSIsIm5hbWUiOiJrZXZpbmVtdW5vejk3IiwiaWF0IjoxNjExNTg1MDAyLjM3NSwiaXNzIjoiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4vIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImtldmluZW11bm96OTdAZ21haWwuY29tIiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXJvbGUiOiJ1c2VyIn0sImV4cCI6MTYxMTY3MTQwMn0.mw72c55PvVWJu6zkuhUCbFZHQU2Y8Z9oPBGuV5mXSrI',
}})]);

const cache = new InMemoryCache();


const client = new ApolloClient({
  link,
  cache
});


const App = () => {
  const [loading,setLoading] = useState(false);
  //const [client, setClient] = React.useState(null);
  
  React.useEffect(() => {
    var a = '';
    var b = '';
      login('kevinemunoz97@gmail.com','Nevermore13', (tkn) => {
        const decodedToken = jwtDecoder(tkn.token);
      AsyncStorage.setItem('@todo-graphql:session', JSON.stringify({
        token: tkn.token,
        name: decodedToken.name,
        id: decodedToken.sub,
        exp: decodedToken.exp
      }))
      });
  },[]);

  if (!client){
    return <Text>AAA</Text>
  }

  return (
    <ApolloProvider client = {client}>
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
          <Scene key="gqladd" component={gqlAdd} hideNavBar={true} title="Gqladd" initial={false}/>
          <Scene key="ahome" component={AnimatedHome} hideNavBar={true} title="Ahome" initial={false}/>

        </Stack>
      </Router>
    </ApolloProvider>
    
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
