import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider, ApolloLink, ApolloClient} from '@apollo/client';
import {createHttpLink} from 'apollo-link-http';

const makeApolloClient = (token) => {
  const link = ApolloLink.from([
    createHttpLink({
      uri: 'https://hasura.io/learn/graphql',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrZXZpbmVtdW5vejk3QGdtYWlsLmNvbSIsIm5hbWUiOiJrZXZpbmVtdW5vejk3IiwiaWF0IjoxNjExNTg1MDAyLjM3NSwiaXNzIjoiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4vIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImtldmluZW11bm96OTdAZ21haWwuY29tIiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXJvbGUiOiJ1c2VyIn0sImV4cCI6MTYxMTY3MTQwMn0.mw72c55PvVWJu6zkuhUCbFZHQU2Y8Z9oPBGuV5mXSrI',
      },
    }),
  ]);

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};

export default makeApolloClient;
