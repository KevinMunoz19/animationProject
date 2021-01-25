import React from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Scene, Router, Stack} from 'react-native-router-flux';
import Init from './src/views/Init';
import Home from './src/views/Home';
import Animation1 from './src/views/Animation1';
import Animation2 from './src/views/Animation2';
import Animation3 from './src/views/Animation3';
import Animation4 from './src/views/Animation4';
import Animation5 from './src/views/Animation5';
import AnimatedHome from './src/views/AnimatedHome';
import gqlEx from './src/views/GraphqlEx';
import gqlAdd from './src/views/GraphqlAdd';
import jwtDecoder from 'jwt-decode';
import {ApolloProvider} from '@apollo/client';
import makeApolloClient from './src/utils/apollo';
const login = (email, password, token) => {
  fetch('https://hasura.io/learn/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  })
    .then((resp) => {
      resp.json().then((respObj) => {
        if (resp.status === 200) {
          token(respObj);
          return;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

var client = makeApolloClient();

const App = () => {
  React.useEffect(() => {
    login('kevinemunoz97@gmail.com', 'Nevermore13', (tkn) => {
      const decodedToken = jwtDecoder(tkn.token);
      AsyncStorage.setItem(
        '@todo-graphql:session',
        JSON.stringify({
          token: tkn.token,
          name: decodedToken.name,
          id: decodedToken.sub,
          exp: decodedToken.exp,
        }),
      );
    });
  }, []);

  if (!client) {
    return <Text>AAA</Text>;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <Stack>
          <Scene
            key="init"
            component={Init}
            hideNavBar={true}
            title="Inicio"
            initial={true}
          />
          <Scene
            key="home"
            component={Home}
            hideNavBar={true}
            title="Home"
            initial={false}
          />
          <Scene
            key="a1"
            component={Animation1}
            hideNavBar={true}
            title="A1"
            initial={false}
          />
          <Scene
            key="a2"
            component={Animation2}
            hideNavBar={true}
            title="A2"
            initial={false}
          />
          <Scene
            key="a3"
            component={Animation3}
            hideNavBar={true}
            title="A3"
            initial={false}
          />
          <Scene
            key="a4"
            component={Animation4}
            hideNavBar={true}
            title="A4"
            initial={false}
          />
          <Scene
            key="a5"
            component={Animation5}
            hideNavBar={true}
            title="A5"
            initial={false}
          />
          <Scene
            key="gqlex"
            component={gqlEx}
            hideNavBar={true}
            title="Gqlex"
            initial={false}
          />
          <Scene
            key="gqladd"
            component={gqlAdd}
            hideNavBar={true}
            title="Gqladd"
            initial={false}
          />
          <Scene
            key="ahome"
            component={AnimatedHome}
            hideNavBar={true}
            title="Ahome"
            initial={false}
          />
        </Stack>
      </Router>
    </ApolloProvider>
  );
};

export default App;
