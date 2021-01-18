import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory'

const makeApolloClient = (token) => {
    const link = new HttpLink({
        uri: `https://hasura.io/learn/graphql`,
        headers: {
            Autorization: `Bearer ${token}`
        }
    });
    const cache = new InMemoryCache();

    const client = new ApolloClient({
        link, 
        cache
    })
    return client;
}

export default makeApolloClient;